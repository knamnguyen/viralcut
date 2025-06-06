import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { S3BucketService } from "@sassy/s3";
import { TRPCError } from "@trpc/server";
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

const SaveMetadataInputSchema = z.object({
  id: z.string(),
  originalName: z.string(),
  originalSize: z.number(),
  originalDuration: z.number(),
  originalKey: z.string(),
  format: z.string(),
  status: z.enum(["uploaded", "processing", "completed", "failed"]),
  speedMultiplier: z.number().default(1).optional(),
});

const GetMetadataInputSchema = z.object({
  id: z.string(),
});

const UpdateStatusInputSchema = z.object({
  id: z.string(),
  status: z.enum(["uploaded", "processing", "completed", "failed"]),
  processedSize: z.number().optional(),
  processedKey: z.string().optional(),
  error: z.string().optional(),
});

const AdjustVideoSpeedInputSchema = z.object({
  videoId: z.string(),
  speedMultiplier: z.number().min(0.1).max(10).default(0.5),
});

const GetProcessingProgressInputSchema = z.object({
  videoId: z.string(),
});

const GetDownloadUrlInputSchema = z.object({
  videoId: z.string(),
  expiresIn: z.number().optional(),
});

type VideoMetadata = z.infer<typeof videoMetadataSchema>;

// In-memory storage for demo purposes (in production, use database)
const videoMetadataStore = new Map<string, VideoMetadata>();

// Initialize S3 service with single bucket
const s3Service = new S3BucketService({
  region: process.env.AWS_REGION || "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  bucket: process.env.S3_BUCKET || "viralcut-s3bucket",
});


// Initialize Remotion service
const remotionService = new RemotionService();

export const remotionRouter = createTRPCRouter({
 
  // Save video metadata after upload
  saveMetadata: publicProcedure
    .input(SaveMetadataInputSchema)
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
    .input(GetMetadataInputSchema)
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

  // Update video processing status
  updateStatus: publicProcedure
    .input(UpdateStatusInputSchema)
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
    .input(AdjustVideoSpeedInputSchema)
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
      
    }),

  // Get processing progress for Remotion render
  getProcessingProgress: publicProcedure
    .input(GetProcessingProgressInputSchema)
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
      
        const downloadUrl = remotionService.generateDownloadUrl(
          metadata.bucketName,
          metadata.processedKey
        );
        
        return {
          success: true,
          downloadUrl,
          videoUrl: downloadUrl, // For preview
        };
      
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
      
    }),

  // Get download URL for processed video
  getDownloadUrl: publicProcedure
    .input(GetDownloadUrlInputSchema)
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
      
      
        const downloadUrl = remotionService.generateDownloadUrl(
          metadata.bucketName,
          metadata.processedKey
        );
        
        return {
          success: true,
          downloadUrl,
          expiresIn: input.expiresIn || 3600,
        };
    }),
}); 