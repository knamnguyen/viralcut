import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { S3BucketService } from "@sassy/s3";
import { TRPCError } from "@trpc/server";
import { videoProcessingJobSchema } from "@sassy/s3/schema-validators";
import type { VideoProcessingJob } from "@sassy/s3/schema-validators";
import { RemotionService } from "../services/remotion-service";
import type { VideoProcessingRequest, RemotionRenderResult } from "../services/remotion-service";

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
  // Remotion specific fields
  renderId: z.string().optional(),
  bucketName: z.string().optional(),
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
  bucket: process.env.S3_BUCKET || "viralcut-s3bucket",
});


// Initialize Remotion service
const remotionService = new RemotionService();

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

        console.log("uploadUrl", uploadUrl);
        
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

  // Adjust video speed using Remotion
  adjustVideoSpeed: publicProcedure
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
        // Create video URL from S3 bucket and key
        const videoUrl = `https://${s3Service.getBucket()}.s3.${process.env.AWS_REGION || "us-west-2"}.amazonaws.com/${metadata.originalKey}`;
        
        const request: VideoProcessingRequest = {
          videoUrl,
          speedMultiplier: input.speedMultiplier,
          originalDuration: metadata.originalDuration,
        };

        console.log("request", request);
        console.log("remotionService", remotionService);
        // console.log("starting remotion processing");
        
        // Start Remotion processing
        const result: RemotionRenderResult = await remotionService.processVideoSpeed(request);
        
        
        // Update video status to processing
        const updatedMetadata: VideoMetadata = {
          ...metadata,
          status: "processing",
          speedMultiplier: input.speedMultiplier,
          renderId: result.renderId,
          bucketName: result.bucketName,
          updatedAt: new Date(),
        };
        
        videoMetadataStore.set(input.videoId, updatedMetadata);
        
        return {
          success: true,
          renderId: result.renderId,
          bucketName: result.bucketName,
          message: result.message,
        };
      } catch (error) {
        console.error("Error adjusting video speed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to adjust video speed: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Get processing progress for Remotion render
  getProcessingProgress: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ input }) => {
      const metadata = videoMetadataStore.get(input.videoId);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      if (!metadata.renderId || !metadata.bucketName) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No processing job found for this video",
        });
      }
      
      try {
        const progress = await remotionService.getRenderProgress(
          metadata.renderId,
          metadata.bucketName
        );
        
        // Update video status if processing is complete
        if (progress.done && progress.outputFile && progress.outputBucket) {
          const updatedMetadata: VideoMetadata = {
            ...metadata,
            status: "completed",
            processedKey: progress.outputFile,
            updatedAt: new Date(),
          };
          
          videoMetadataStore.set(input.videoId, updatedMetadata);
        } else if (progress.fatalErrorEncountered) {
          const updatedMetadata: VideoMetadata = {
            ...metadata,
            status: "failed",
            updatedAt: new Date(),
          };
          
          videoMetadataStore.set(input.videoId, updatedMetadata);
        }
        
        return progress;
      } catch (error) {
        console.error("Error getting processing progress:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to get processing progress: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Get processed video URL
  getProcessedVideoUrl: publicProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ input }) => {
      const metadata = videoMetadataStore.get(input.videoId);
      
      if (!metadata) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Video metadata not found",
        });
      }
      
      if (metadata.status !== "completed" || !metadata.bucketName || !metadata.processedKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Processed video is not available",
        });
      }
      
      try {
        const downloadUrl = remotionService.generateDownloadUrl(
          metadata.bucketName,
          metadata.processedKey
        );
        
        return {
          success: true,
          downloadUrl,
          videoUrl: downloadUrl, // For preview
        };
      } catch (error) {
        console.error("Error generating processed video URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to generate processed video URL: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Legacy endpoints for backward compatibility
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
        // Create video URL from S3 bucket and key
        const videoUrl = `https://${s3Service.getBucket()}.s3.${process.env.AWS_REGION || "us-west-2"}.amazonaws.com/${metadata.originalKey}`;
        
        const request: VideoProcessingRequest = {
          videoUrl,
          speedMultiplier: input.speedMultiplier,
          originalDuration: metadata.originalDuration,
        };
        
        // Start Remotion processing
        const result: RemotionRenderResult = await remotionService.processVideoSpeed(request);
        
        // Update video status to processing
        const updatedMetadata: VideoMetadata = {
          ...metadata,
          status: "processing",
          speedMultiplier: input.speedMultiplier,
          renderId: result.renderId,
          bucketName: result.bucketName,
          updatedAt: new Date(),
        };
        
        videoMetadataStore.set(input.videoId, updatedMetadata);
        
        return {
          success: true,
          jobId: result.renderId, // Use renderId as jobId for legacy compatibility
          message: result.message,
        };
      } catch (error) {
        console.error("Error starting video processing:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to start video processing: ${error instanceof Error ? error.message : "Unknown error"}`,
        });
      }
    }),

  // Get processing job status (legacy)
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
      
      if (metadata.status !== "completed" || !metadata.bucketName || !metadata.processedKey) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Processed video is not available",
        });
      }
      
      try {
        const downloadUrl = remotionService.generateDownloadUrl(
          metadata.bucketName,
          metadata.processedKey
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