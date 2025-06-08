import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";
import { RemotionService } from "../services/remotion-service";
import type { VideoProcessingRequest, RemotionRenderResult } from "../services/remotion-service";
import { VideoPreprocessingService, type VideoSegment, type VideoPreprocessingResult } from "../services/video-preprocessing-service";

// Initialize services
const remotionService = new RemotionService();
const preprocessingService = new VideoPreprocessingService();

const ProcessVideoSpeedInputSchema = z.object({
  videoUrl: z.string().url(),
  speedMultiplier: z.number().min(0.1).max(10),
  originalDuration: z.number().positive(),
});

const GetRenderProgressInputSchema = z.object({
  renderId: z.string(),
  bucketName: z.string(),
});

const GetDownloadUrlInputSchema = z.object({
  bucketName: z.string(),
  outputFile: z.string(),
});

const PreprocessVideoInputSchema = z.object({
  videoUrl: z.string().url(),
  originalDuration: z.number().positive(),
  segmentDurationMinutes: z.number().min(1).max(10).optional().default(2),
});

const ProcessSegmentsInputSchema = z.object({
  segments: z.array(z.object({
    segmentIndex: z.number(),
    startTime: z.number(),
    duration: z.number(),
    s3Key: z.string(),
    s3Url: z.string().url(),
  })),
  speedMultiplier: z.number().min(0.1).max(10),
  preprocessingId: z.string(),
});

export const remotionRouter = createTRPCRouter({
  // Preprocess video into segments for efficient processing
  preprocessVideo: publicProcedure
    .input(PreprocessVideoInputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Starting video preprocessing:", input);
        
        const result = await preprocessingService.preprocessVideo(
          input.videoUrl,
          input.originalDuration,
          input.segmentDurationMinutes
        );
        
        return {
          success: true,
          ...result,
        };
      } catch (error) {
        console.error("Video preprocessing failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Video preprocessing failed",
        });
      }
    }),

  // Process video segments with speed adjustment
  processSegments: publicProcedure
    .input(ProcessSegmentsInputSchema)
    .mutation(async ({ input }) => {
      try {
        console.log("Starting segment processing:", {
          segmentCount: input.segments.length,
          speedMultiplier: input.speedMultiplier,
          preprocessingId: input.preprocessingId
        });
        
        // Process each segment in parallel using Remotion
        const segmentResults = await Promise.all(
          input.segments.map(async (segment) => {
            const request: VideoProcessingRequest = {
              videoUrl: segment.s3Url,
              speedMultiplier: input.speedMultiplier,
              originalDuration: segment.duration,
            };
            
            console.log(`Processing segment ${segment.segmentIndex}:`, request);
            return await remotionService.processVideoSpeed(request);
          })
        );
        
        return {
          success: true,
          segmentResults,
          message: `Started processing ${input.segments.length} segments`,
          preprocessingId: input.preprocessingId,
        };
      } catch (error) {
        console.error("Segment processing failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Segment processing failed",
        });
      }
    }),

  // Process video speed - direct processing without metadata storage (legacy method)
  processVideoSpeed: publicProcedure
    .input(ProcessVideoSpeedInputSchema)
    .mutation(async ({ input }) => {
      try {
        const request: VideoProcessingRequest = {
          videoUrl: input.videoUrl,
          speedMultiplier: input.speedMultiplier,
          originalDuration: input.originalDuration,
        };

        console.log("Starting video processing:", request);
        
        // Start Remotion processing
        const result: RemotionRenderResult = await remotionService.processVideoSpeed(request);
        
        return {
          success: true,
          renderId: result.renderId,
          bucketName: result.bucketName,
          message: result.message,
        };
      } catch (error) {
        console.error("Video processing failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Video processing failed",
        });
      }
    }),

  // Get render progress by renderId and bucketName
  getRenderProgress: publicProcedure
    .input(GetRenderProgressInputSchema)
    .query(async ({ input }) => {
      try {
        const progress = await remotionService.getRenderProgress(
          input.renderId,
          input.bucketName
        );
        
        return progress;
      } catch (error) {
        console.error("Failed to get render progress:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to get render progress",
        });
      }
    }),

  // Get download URL for processed video
  getDownloadUrl: publicProcedure
    .input(GetDownloadUrlInputSchema)
    .query(async ({ input }) => {
      try {
        const downloadUrl = remotionService.generateDownloadUrl(
          input.bucketName,
          input.outputFile
        );
        
        return {
          success: true,
          downloadUrl,
        };
      } catch (error) {
        console.error("Failed to generate download URL:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to generate download URL",
        });
      }
    }),

  // Clean up video segments after processing
  cleanupSegments: publicProcedure
    .input(z.object({
      segments: z.array(z.object({
        segmentIndex: z.number(),
        startTime: z.number(),
        duration: z.number(),
        s3Key: z.string(),
        s3Url: z.string().url(),
      })),
    }))
    .mutation(async ({ input }) => {
      try {
        await preprocessingService.cleanupSegments(input.segments);
        
        return {
          success: true,
          message: `Cleaned up ${input.segments.length} segments`,
        };
      } catch (error) {
        console.error("Failed to cleanup segments:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: error instanceof Error ? error.message : "Failed to cleanup segments",
        });
      }
    }),
}); 