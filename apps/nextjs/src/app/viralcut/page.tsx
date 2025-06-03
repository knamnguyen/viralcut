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
import { useMutation, useQueryClient } from "@tanstack/react-query";
 
const FileUploadDropzone = () => {
  const [files, setFiles] = useState<File[] | null>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "completed" | "failed">("idle");

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  // tRPC mutations following the posts.tsx pattern
  const getUploadUrl = useMutation(
    trpc.video.getUploadUrl.mutationOptions({
      onError: (err: any) => {
        toast.error("Failed to get upload URL");
        console.error(err);
        setUploadStatus("failed");
      },
    })
  );
  
  const saveMetadata = useMutation(
    trpc.video.saveMetadata.mutationOptions({
      onError: (err: any) => {
        toast.error("Failed to save video metadata");
        console.error(err);
      },
    })
  );

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
      
      // Create the S3 URL for the uploaded video
      const videoUrl = `https://${uploadData.bucket}.s3.amazonaws.com/${uploadData.key}`;
      setUploadedVideoUrl(videoUrl);
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
    setUploadedVideoUrl(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const getStatusMessage = () => {
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

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Video Upload to S3</h1>
        <p className="text-gray-600">
          Upload a video (max 2GB, 5 minutes) to cloud storage and get back the URL
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
            Upload Video to S3
          </Button>
        </div>
      )}

      {uploadStatus === "uploading" && (
        <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{getStatusMessage()}</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="w-full" />
          </div>
        </div>
      )}

      {uploadStatus === "completed" && uploadedVideoUrl && (
        <div className="space-y-4 p-4 bg-green-50 border border-green-200 rounded">
          <h3 className="text-lg font-semibold text-green-800">
            Video Uploaded Successfully!
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-green-700 font-medium">Uploaded Video URL:</p>
              <div className="p-2 bg-white rounded border text-sm font-mono break-all">
                {uploadedVideoUrl}
              </div>
              <Button 
                onClick={() => navigator.clipboard.writeText(uploadedVideoUrl)}
                variant="outline"
                size="sm"
              >
                Copy URL
              </Button>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-green-700 font-medium">Preview from S3:</p>
              <video
                src={uploadedVideoUrl}
                controls
                className="w-full h-40 rounded border"
                preload="metadata"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={resetUpload} variant="outline" className="w-full">
                Upload Another Video
              </Button>
            </div>
          </div>
        </div>
      )}

      {uploadStatus === "failed" && (
        <div className="space-y-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-800">
            Upload Failed
          </h3>
          <div className="space-y-2">
            <p className="text-sm text-red-700">
              Something went wrong during video upload. Please try again.
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