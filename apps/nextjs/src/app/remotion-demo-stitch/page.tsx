"use client";
 
import {
  FileUploader,
  FileInput,
  FileUploaderContent,
  FileUploaderItem,
} from "@sassy/ui/components/file-uploader";
import { Button } from "@sassy/ui/button";
import { Progress } from "@sassy/ui/progress";
import { VIDEO_CONSTRAINTS } from "@sassy/ui/schema-validators";
import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import { useTRPC } from "~/trpc/react";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMultipartUpload } from "~/hooks/use-multipart-upload";

interface VideoClip {
  range: string;
  caption: string;
}

const FileUploadDropzone = () => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "completed" | "failed">("idle");
  const [processingStatus, setProcessingStatus] = useState<"idle" | "processing" | "completed" | "failed">("idle");
  
  // Video clips state
  const [clips, setClips] = useState<VideoClip[]>([
    { range: "00:05-00:15", caption: "This is a great clip!" }
  ]);
  
  // Store processing data from Remotion
  const [processingData, setProcessingData] = useState<{
    renderId: string;
    bucketName: string;
    videoUrl: string;
    originalDuration: number;
  } | null>(null);
  
  // Store final result
  const [processedVideoUrl, setProcessedVideoUrl] = useState<string | null>(null);

  const trpc = useTRPC();

  // Multipart upload hook
  const { uploadFile: uploadFileWithMultipart } = useMultipartUpload({
    onProgress: (progress) => {
      setUploadProgress(progress.percentage);
    },
    onSuccess: (result) => {
      console.log("Upload successful:", result);
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error(`Error: ${error.message}`);
      setUploadStatus("failed");
    },
  });
  
  const processVideoStitch = useMutation(
    trpc.remotionDemoStitch.processVideoStitch.mutationOptions({
      onSuccess: (data) => {
        setProcessingStatus("processing");
        toast.success("Video stitch processing started!");
      },
      onError: (err: any) => {
        console.error("Failed to start video stitch processing:", err.message);
        toast.error("Failed to start video stitch processing");
        setProcessingStatus("failed");
      },
    })
  );

  // Query for processing progress
  const { data: progress } = useQuery({
    ...trpc.remotionDemoStitch.getRenderProgress.queryOptions({
      renderId: processingData?.renderId || "",
      bucketName: processingData?.bucketName || "",
    }),
    enabled: Boolean(processingData?.renderId && processingData?.bucketName && processingStatus === "processing"),
    refetchInterval: (data: any) => {
      return processingStatus === "processing" && !data?.done ? 10000 : false;
    },
  });

  // Query for download URL when processing is complete
  const { data: downloadData } = useQuery({
    ...trpc.remotionDemoStitch.getDownloadUrl.queryOptions({
      bucketName: processingData?.bucketName || "",
      outputFile: progress?.outputFile || "",
    }),
    enabled: Boolean(processingData?.bucketName && progress?.outputFile && progress?.done && !progress?.fatalErrorEncountered),
  });

  // Update processing status based on progress
  if (progress?.done && processingStatus === "processing") {
    if (progress.fatalErrorEncountered) {
      setProcessingStatus("failed");
    } else {
      setProcessingStatus("completed");
      if (downloadData?.downloadUrl) {
        setProcessedVideoUrl(downloadData.downloadUrl);
      }
    }
  }

  // Debug logging
  console.log("Frontend Debug:", {
    processingData,
    processingStatus,
    progress,
    downloadData,
    processedVideoUrl,
  });
 
  const dropzone = {
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: VIDEO_CONSTRAINTS.MAX_SIZE, // 2GB
  } satisfies DropzoneOptions;

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      toast.error("Please select a video file first");
      return;
    }

    const file = files[0]!;
    setIsUploading(true);
    setUploadStatus("uploading");
    setUploadProgress(0);

    try {
      // Step 1: Upload to S3 using multipart upload
      const uploadResult = await uploadFileWithMultipart(file);

      // Step 2: Get video duration for processing
      setUploadProgress(80);
      const duration = await getVideoDuration(file);
      
      // Step 3: Store processing info for later use
      setProcessingData({
        renderId: "", // Will be set after processing starts
        bucketName: "", // Will be set after processing starts
        videoUrl: uploadResult.location,
        originalDuration: duration,
      });

      setUploadProgress(100);
      setUploadStatus("completed");
      
      toast.success("Video uploaded successfully!");

    } catch (error) {
      console.error("Upload error:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      setUploadStatus("failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleProcessVideoStitch = async () => {
    if (!processingData?.videoUrl) {
      toast.error("No video available for processing");
      return;
    }

    // Validate clips
    if (clips.length === 0) {
      toast.error("Please add at least one clip");
      return;
    }

    if (clips.length > 20) {
      toast.error("Maximum 20 clips allowed");
      return;
    }

    // Validate each clip
    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i]!;
      if (!clip.range.trim()) {
        toast.error(`Clip ${i + 1}: Time range is required`);
        return;
      }
      if (!clip.caption.trim()) {
        toast.error(`Clip ${i + 1}: Caption is required`);
        return;
      }
      if (!/^\d{1,2}:\d{2}-\d{1,2}:\d{2}$/.test(clip.range.trim())) {
        toast.error(`Clip ${i + 1}: Invalid time format. Use MM:SS-MM:SS`);
        return;
      }
    }

    try {
      const result = await processVideoStitch.mutateAsync({
        videoUrl: processingData.videoUrl,
        clips: clips,
        originalDuration: processingData.originalDuration,
      });

      // Update processing data with render info
      setProcessingData(prev => prev ? {
        ...prev,
        renderId: result.renderId,
        bucketName: result.bucketName,
      } : null);

    } catch (error) {
      console.error("Processing error:", error);
      setProcessingStatus("failed");
    }
  };

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");
      video.preload = "metadata";
      
      video.onloadedmetadata = () => {
        resolve(video.duration);
      };
      
      video.onerror = () => {
        resolve(0); // Default duration if unable to detect
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const addClip = () => {
    if (clips.length >= 20) {
      toast.error("Maximum 20 clips allowed");
      return;
    }
    setClips([...clips, { range: "", caption: "" }]);
  };

  const removeClip = (index: number) => {
    if (clips.length <= 1) {
      toast.error("At least one clip is required");
      return;
    }
    setClips(clips.filter((_, i) => i !== index));
  };

  const updateClip = (index: number, field: keyof VideoClip, value: string) => {
    const updatedClips = [...clips];
    updatedClips[index] = { ...updatedClips[index]!, [field]: value };
    setClips(updatedClips);
  };

  const resetUpload = () => {
    setFiles([]);
    setUploadStatus("idle");
    setUploadProgress(0);
    setProcessingStatus("idle");
    setProcessingData(null);
    setProcessedVideoUrl(null);
    setClips([{ range: "00:05-00:15", caption: "This is a great clip!" }]);
  };

  const getUploadStatusMessage = () => {
    switch (uploadStatus) {
      case "uploading":
        return "Uploading video to cloud storage...";
      case "completed":
        return "Video uploaded successfully!";
      case "failed":
        return "Upload failed. Please try again.";
      default:
        return "";
    }
  };

  const getProcessingStatusMessage = () => {
    switch (processingStatus) {
      case "processing":
        return `Processing ${clips.length} video clips with captions...`;
      case "completed":
        return "Video stitch processing completed!";
      case "failed":
        return "Processing failed. Please try again.";
      default:
        return "";
    }
  };
 
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Video Demo Stitch</h1>
        <p className="text-gray-600">
          Upload a video and create highlight reels by selecting time ranges and adding captions. Maximum 20 clips, each up to 30 seconds.
        </p>
      </div>

      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={dropzone}
      >
        <FileInput>
          <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
            <p className="text-gray-400">Drop video files here</p>
          </div>
        </FileInput>
        <FileUploaderContent className="flex items-center flex-row gap-2">
          {files?.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="w-full p-4 rounded-md overflow-hidden border"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              <div className="space-y-2">
                <video
                  src={URL.createObjectURL(file)}
                  controls
                  className="w-full h-40 rounded"
                  preload="metadata"
                />
                <div className="text-sm text-gray-600">
                  <p>File: {file.name}</p>
                  <p>Size: {(file.size / 1024 / 1024).toFixed(1)} MB</p>
                </div>
              </div>
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>

      {files && files.length > 0 && uploadStatus === "idle" && (
        <div className="space-y-4">
          <Button 
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full"
          >
            Upload Video
          </Button>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getUploadStatusMessage()}</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        </div>
      )}

      {uploadStatus === "completed" && processingStatus === "idle" && (
        <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Video Uploaded Successfully!
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-green-700">
                  Video Clips ({clips.length}/20)
                </label>
                <Button onClick={addClip} variant="outline" size="sm">
                  Add Clip
                </Button>
              </div>
              
              {clips.map((clip, index) => (
                <div key={index} className="space-y-2 p-3 border rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Clip {index + 1}</span>
                    {clips.length > 1 && (
                      <Button
                        onClick={() => removeClip(index)}
                        variant="outline"
                        size="sm"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="text-xs text-gray-600">Time Range (MM:SS-MM:SS)</label>
                      <input
                        type="text"
                        value={clip.range}
                        onChange={(e) => updateClip(index, "range", e.target.value)}
                        placeholder="01:30-02:00"
                        className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div>
                      <label className="text-xs text-gray-600">Caption (max 200 chars)</label>
                      <input
                        type="text"
                        value={clip.caption}
                        onChange={(e) => updateClip(index, "caption", e.target.value)}
                        placeholder="Enter caption..."
                        maxLength={200}
                        className="w-full p-2 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={handleProcessVideoStitch}
              disabled={processVideoStitch.isPending}
              className="w-full"
            >
              {processVideoStitch.isPending ? "Starting Processing..." : "Create Video Stitch"}
            </Button>
            
            <Button onClick={resetUpload} variant="outline" className="w-full">
              Upload Another Video
            </Button>
          </div>
        </div>
      )}

      {processingStatus === "processing" && (
        <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getProcessingStatusMessage()}</span>
              <span>{progress ? Math.round(progress.progress * 100) : 0}%</span>
            </div>
            <Progress value={progress ? progress.progress * 100 : 0} className="w-full" />
          </div>
          <p className="text-sm text-blue-700">
            This may take a few minutes depending on the number of clips...
          </p>
        </div>
      )}

      {processingStatus === "completed" && (
        <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Video Stitch Complete!
          </h3>
          
          {!processedVideoUrl && (
            <p className="text-sm text-blue-700">Loading processed video...</p>
          )}
          
          {processedVideoUrl && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-green-700 font-medium">Final Stitched Video:</p>
                <video
                  src={processedVideoUrl}
                  controls
                  className="w-full h-60 rounded border"
                  preload="metadata"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => window.open(processedVideoUrl, '_blank')}
                  className="flex-1"
                >
                  Download Video
                </Button>
                <Button onClick={resetUpload} variant="outline" className="flex-1">
                  Create Another Stitch
                </Button>
              </div>
            </div>
          )}
          
          {!processedVideoUrl && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Video URL not available yet. This may take a moment...
              </p>
              <Button onClick={resetUpload} variant="outline" className="w-full">
                Try Creating Another Stitch
              </Button>
            </div>
          )}
        </div>
      )}

      {(uploadStatus === "failed" || processingStatus === "failed") && (
        <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-800">
            {uploadStatus === "failed" ? "Upload Failed" : "Processing Failed"}
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-red-700">
              Something went wrong. Please try again.
            </p>
            <Button onClick={resetUpload} variant="outline" className="w-full">
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default FileUploadDropzone; 