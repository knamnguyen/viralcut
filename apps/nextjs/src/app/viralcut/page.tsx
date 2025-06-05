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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
 
const FileUploadDropzone = () => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideoId, setUploadedVideoId] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "completed" | "failed">("idle");
  const [speedMultiplier, setSpeedMultiplier] = useState(0.5);
  const [processingStatus, setProcessingStatus] = useState<"idle" | "processing" | "completed" | "failed">("idle");
  const [renderId, setRenderId] = useState<string | null>(null);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // tRPC mutations
  const getUploadUrl = useMutation(
    trpc.video.getUploadUrl.mutationOptions({
      onError: (err: any) => {
        console.error("Failed to get upload URL:", err.message);
        toast.error("Failed to get upload URL");
        setUploadStatus("failed");
      },
    })
  );
  
  const saveMetadata = useMutation(
    trpc.video.saveMetadata.mutationOptions({
      onError: (err: any) => {
        console.error("Failed to save video metadata:", err.message);
        toast.error("Failed to save video metadata");
      },
    })
  );

  const adjustVideoSpeed = useMutation(
    trpc.video.adjustVideoSpeed.mutationOptions({
      onSuccess: (data) => {
        setRenderId(data.renderId);
        setProcessingStatus("processing");
        toast.success("Video processing started!");
      },
      onError: (err: any) => {
        console.error("Failed to start video processing:", err.message);
        toast.error("Failed to start video processing");
        setProcessingStatus("failed");
      },
    })
  );

  // Query for processing progress
  const { data: progress } = useQuery({
    ...trpc.video.getProcessingProgress.queryOptions({
      videoId: uploadedVideoId || "",
    }),
    enabled: Boolean(uploadedVideoId && processingStatus === "processing"),
    refetchInterval: (data: any) => {
      return processingStatus === "processing" && !data?.done ? 10000 : false;
    },
  });

  // Query for processed video URL
  const { data: processedVideoData, error: processedVideoError, isLoading: processedVideoLoading } = useQuery({
    ...trpc.video.getProcessedVideoUrl.queryOptions({
      videoId: uploadedVideoId || "",
    }),
    enabled: Boolean(uploadedVideoId && processingStatus === "completed"),
  });

  // Update processing status based on progress
  if (progress?.done && processingStatus === "processing") {
    if (progress.fatalErrorEncountered) {
      setProcessingStatus("failed");
    } else {
      setProcessingStatus("completed");
      // Invalidate all video queries to ensure fresh data
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'video'
      });
    }
  }

  // Debug logging for processed video data
  console.log("Frontend Debug:", {
    uploadedVideoId,
    processingStatus,
    processedVideoData,
    processedVideoError,
    processedVideoLoading,
    queryEnabled: Boolean(uploadedVideoId && processingStatus === "completed")
  });
 
  const dropzone = {
    accept: {
      "video/*": [".mp4", ".mov", ".avi", ".mkv", ".webm"],
    },
    multiple: false,
    maxFiles: 1,
    maxSize: VIDEO_CONSTRAINTS.MAX_SIZE, // 2GB
  } satisfies DropzoneOptions;

  const uploadToS3 = async (file: File, uploadUrl: string): Promise<boolean> => {
    try {
      const response = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("S3 Upload failed:", { status: response.status, error: errorText });
      }

      return response.ok;
    } catch (error) {
      console.error("S3 upload error:", error);
      return false;
    }
  };

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
      // Step 1: Get presigned upload URL
      setUploadProgress(20);
      const uploadData = await getUploadUrl.mutateAsync({
        fileName: file.name,
        contentType: file.type,
        prefix: "uploads",
      });

      if (!uploadData.success) {
        throw new Error("Failed to get upload URL");
      }

      // Step 2: Upload file to S3
      setUploadProgress(40);
      const uploadSuccess = await uploadToS3(file, uploadData.uploadUrl);
      
      if (!uploadSuccess) {
        throw new Error("Failed to upload file to S3");
      }

      setUploadProgress(70);

      // Step 3: Get video duration for metadata
      const duration = await getVideoDuration(file);
      
      // Step 4: Save video metadata
      const videoId = `video-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      
      await saveMetadata.mutateAsync({
        id: videoId,
        originalName: file.name,
        originalSize: file.size,
        originalDuration: duration,
        originalKey: uploadData.key,
        format: file.type,
        status: "uploaded",
      });

      setUploadProgress(100);
      setUploadedVideoId(videoId);
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

  const handleAdjustSpeed = async () => {
    if (!uploadedVideoId) {
      toast.error("No video available for processing");
      return;
    }

    await adjustVideoSpeed.mutateAsync({
      videoId: uploadedVideoId,
      speedMultiplier,
    });
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

  const resetUpload = () => {
    setFiles([]);
    setUploadedVideoId(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    setProcessingStatus("idle");
    setRenderId(null);
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
        return `Processing video with ${speedMultiplier}x speed...`;
      case "completed":
        return "Video processing completed!";
      case "failed":
        return "Processing failed. Please try again.";
      default:
        return "";
    }
  };
 
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Video Speed Adjustment</h1>
        <p className="text-gray-600">
          Upload a video (max 2GB, 5 minutes) and adjust its playback speed using AI processing
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
            <div className="space-y-2">
              <label className="text-sm font-medium text-green-700">
                Speed Multiplier: {speedMultiplier}x
              </label>
              <input
                type="range"
                min="0.1"
                max="3"
                step="0.1"
                value={speedMultiplier}
                onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>0.1x (Very Slow)</span>
                <span>1x (Normal)</span>
                <span>3x (Fast)</span>
              </div>
            </div>
            
            <Button 
              onClick={handleAdjustSpeed}
              disabled={adjustVideoSpeed.isPending}
              className="w-full"
            >
              {adjustVideoSpeed.isPending ? "Starting Processing..." : "Adjust Video Speed"}
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
            This may take a few minutes depending on video length...
          </p>
        </div>
      )}

      {processingStatus === "completed" && (
        <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Video Processing Complete!
          </h3>
          
          {processedVideoLoading && (
            <p className="text-sm text-blue-700">Loading processed video...</p>
          )}
          
          {processedVideoError && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                Error loading video: {processedVideoError.message}
              </p>
            </div>
          )}
          
          {processedVideoData && (
            <div className="space-y-4">
            <div className="space-y-2">
                <p className="text-sm text-green-700 font-medium">Processed Video Preview:</p>
              <video
                  src={processedVideoData.videoUrl}
                controls
                  className="w-full h-60 rounded border"
                preload="metadata"
              />
            </div>
            
            <div className="flex gap-2">
                <Button 
                  onClick={() => window.open(processedVideoData.downloadUrl, '_blank')}
                  className="flex-1"
                >
                  Download Video
                </Button>
                <Button onClick={resetUpload} variant="outline" className="flex-1">
                  Process Another Video
                </Button>
              </div>
            </div>
          )}
          
          {!processedVideoData && !processedVideoLoading && !processedVideoError && (
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Video URL not available yet. This may take a moment...
              </p>
              <Button onClick={resetUpload} variant="outline" className="w-full">
                Try Processing Another Video
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