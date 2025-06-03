import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { S3BucketService } from "@sassy/s3";
import { TRPCError } from "@trpc/server";
import { videoProcessingJobSchema } from "@sassy/s3/schema-validators";
import type { VideoProcessingJob } from "@sassy/s3/schema-validators";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";

// Video metadata schema
const videoMetadataSchema = z.object({
  id: z.string(),
  originalName: z.string(),
  originalSize: z.number(),
  originalDuration: z.number(),
  processedSize: z.number().optional(),
  processedKey: z.string().optional(),
  originalKey: z.string(),
  speedMultiplier: z.number().default(1),
  format: z.string(),
  status: z.enum(["uploaded", "processing", "completed", "failed"]),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

type VideoMetadata = z.infer<typeof videoMetadataSchema>;

// In-memory storage for demo purposes (in production, use database)
const videoMetadataStore = new Map<string, VideoMetadata>();
const videoProcessingJobs = new Map<string, VideoProcessingJob>();

// Initialize S3 service with single bucket
const s3Service = new S3BucketService({
  region: process.env.AWS_REGION || "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  bucket: process.env.S3_BUCKET || "viralcut-default",
});

// Initialize Lambda client
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || "us-west-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const videoRouter = createTRPCRouter({
  // Get presigned URL for direct upload to S3
  getUploadUrl: publicProcedure
    .input(
      z.object({
        fileName: z.string(),
        contentType: z.string().optional(),
        prefix: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const key = s3Service.generateUniqueKey(input.fileName, input.prefix || "uploads");
        const uploadUrl = await s3Service.getPresignedUploadUrl(
          key,
          input.contentType,
          3600 // 1 hour expiry
        );
        
        return {
          success: true,
          uploadUrl,
          key,
          bucket: s3Service.getBucket(),
          expiresIn: 3600,
        };
      } catch (error) {
        console.error("Error generating upload URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate upload URL: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Save video metadata after upload
  saveMetadata: publicProcedure
    .input(
      z.object({
        id: z.string(),
        originalName: z.string(),
        originalSize: z.number(),
        originalDuration: z.number(),
        originalKey: z.string(),
        format: z.string(),
        status: z.enum(["uploaded", "processing", "completed", "failed"]),
        speedMultiplier: z.number().default(1).optional(),
      })
    )
    .mutation(({ input }) => {
      const metadata: VideoMetadata = {
        ...input,
        speedMultiplier: input.speedMultiplier || 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      videoMetadataStore.set(input.id, metadata);
      
      return {
        success: true,
        metadata,
      };
    }),

  // Get video metadata by ID
  getMetadata: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      const metadata = videoMetadataStore.get(input.id);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      return metadata;
    }),

  // List all video metadata
  listVideos: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        status: z.enum(["uploaded", "processing", "completed", "failed"]).optional(),
      })
    )
    .query(({ input }) => {
      const allVideos = Array.from(videoMetadataStore.values());
      
      // Filter by status if provided
      const filteredVideos = input.status
        ? allVideos.filter(video => video.status === input.status)
        : allVideos;
      
      // Sort by creation date (newest first) and limit
      const videos = filteredVideos
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, input.limit);
      
      return {
        videos,
        total: filteredVideos.length,
      };
    }),

  // Update video processing status
  updateStatus: publicProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.enum(["uploaded", "processing", "completed", "failed"]),
        processedSize: z.number().optional(),
        processedKey: z.string().optional(),
        error: z.string().optional(),
      })
    )
    .mutation(({ input }) => {
      const metadata = videoMetadataStore.get(input.id);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      const updatedMetadata: VideoMetadata = {
        ...metadata,
        status: input.status,
        processedSize: input.processedSize || metadata.processedSize,
        processedKey: input.processedKey || metadata.processedKey,
        updatedAt: new Date(),
      };
      
      videoMetadataStore.set(input.id, updatedMetadata);
      
      return {
        success: true,
        metadata: updatedMetadata,
      };
    }),

  // Start video processing job
  startProcessing: publicProcedure
    .input(
      z.object({
        videoId: z.string(),
        speedMultiplier: z.number().min(0.1).max(10).default(0.5),
      })
    )
    .mutation(async ({ input }) => {
      const metadata = videoMetadataStore.get(input.videoId);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      if (metadata.status === "processing") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Video is already being processed",
        });
      }
      
      try {
        // Create a job ID
        const jobId = `job-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
        
        // Update video status to processing
        const updatedMetadata: VideoMetadata = {
          ...metadata,
          status: "processing",
          speedMultiplier: input.speedMultiplier,
          updatedAt: new Date(),
        };
        
        videoMetadataStore.set(input.videoId, updatedMetadata);
        
        // Create a processing job
        const job: VideoProcessingJob = {
          jobId,
          status: "pending",
          progress: 0,
          originalKey: metadata.originalKey,
          speedMultiplier: input.speedMultiplier,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        videoProcessingJobs.set(jobId, job);
        
        // Invoke Lambda function to process the video
        // This would be where you trigger your Remotion Lambda
        const lambdaName = process.env.VIDEO_PROCESSING_LAMBDA || "remotion-render-video-speed";
        
        try {
          const command = new InvokeCommand({
            FunctionName: lambdaName,
            InvocationType: "Event", // Asynchronous invocation
            Payload: Buffer.from(JSON.stringify({
              jobId,
              videoId: input.videoId,
              originalKey: metadata.originalKey,
              bucket: s3Service.getBucket(),
              speedMultiplier: input.speedMultiplier,
            })),
          });
          
          await lambdaClient.send(command);
          
          // Update job status
          job.status = "processing";
          videoProcessingJobs.set(jobId, job);
          
          return {
            success: true,
            jobId,
            message: "Video processing started",
          };
        } catch (error) {
          // Update job and video status on error
          job.status = "failed";
          job.error = `Lambda invocation failed: ${error instanceof Error ? error.message : "Unknown error"}`;
          videoProcessingJobs.set(jobId, job);
          
          updatedMetadata.status = "failed";
          videoMetadataStore.set(input.videoId, updatedMetadata);
          
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: `Failed to start video processing: ${error instanceof Error ? error.message : "Unknown error"}`,
          });
        }
      } catch (error) {
        console.error("Error starting video processing:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to start video processing: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Get processing job status
  getJobStatus: publicProcedure
    .input(z.object({ jobId: z.string() }))
    .query(({ input }) => {
      const job = videoProcessingJobs.get(input.jobId);
      
      if (!job) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Processing job not found",
        });
      }
      
      return job;
    }),

  // Get download URL for processed video
  getDownloadUrl: publicProcedure
    .input(z.object({ 
      videoId: z.string(),
      expiresIn: z.number().optional(),
    }))
    .query(async ({ input }) => {
      const metadata = videoMetadataStore.get(input.videoId);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      if (metadata.status !== "completed" || !metadata.processedKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Processed video is not available",
        });
      }
      
      try {
        const downloadUrl = await s3Service.getPresignedDownloadUrl(
          metadata.processedKey,
          input.expiresIn || 3600 // Default 1 hour expiry
        );
        
        return {
          success: true,
          downloadUrl,
          expiresIn: input.expiresIn || 3600,
        };
      } catch (error) {
        console.error("Error generating download URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate download URL: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Get processing statistics
  getStats: publicProcedure
    .query(() => {
      const allVideos = Array.from(videoMetadataStore.values());
      const allJobs = Array.from(videoProcessingJobs.values());
      
      const stats = {
        total: allVideos.length,
        completed: allVideos.filter(v => v.status === "completed").length,
        processing: allVideos.filter(v => v.status === "processing").length,
        failed: allVideos.filter(v => v.status === "failed").length,
        totalOriginalSize: allVideos.reduce((sum, v) => sum + v.originalSize, 0),
        totalProcessedSize: allVideos.reduce((sum, v) => sum + (v.processedSize || 0), 0),
        activeJobs: allJobs.filter(j => j.status === "processing").length,
        pendingJobs: allJobs.filter(j => j.status === "pending").length,
      };
      
      return stats;
    }),

  // Delete video and its metadata
  deleteVideo: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const metadata = videoMetadataStore.get(input.id);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      try {
        // Delete original video from S3
        if (metadata.originalKey) {
          await s3Service.deleteFile(metadata.originalKey);
        }
        
        // Delete processed video from S3 if it exists
        if (metadata.processedKey) {
          await s3Service.deleteFile(metadata.processedKey);
        }
        
        // Delete metadata
        videoMetadataStore.delete(input.id);
        
        return {
          success: true,
          message: "Video and metadata deleted successfully",
        };
      } catch (error) {
        console.error("Error deleting video:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to delete video: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),
}); 