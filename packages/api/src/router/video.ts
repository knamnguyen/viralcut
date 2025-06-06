import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { S3BucketService } from "@sassy/s3";
import { TRPCError } from "@trpc/server";
import type { VideoProcessingJob } from "@sassy/s3/schema-validators";
import type { VideoProcessingRequest, RemotionRenderResult } from "../services/remotion-service";


// Initialize S3 service with single bucket
const s3Service = new S3BucketService({
  region: process.env.AWS_REGION || "us-west-2",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  bucket: process.env.S3_BUCKET || "viralcut-s3bucket",
});

const GetUploadUrlInputSchema = z.object({
  fileName: z.string(),
  contentType: z.string().optional(),
  prefix: z.string().optional(),
});

const InitMultipartUploadInputSchema = z.object({
  fileName: z.string(),
  contentType: z.string().optional(),
  prefix: z.string().optional(),
});

const GetPartUrlsInputSchema = z.object({
  key: z.string(),
  uploadId: z.string(),
  partNumbers: z.array(z.number()),
});

const CompleteMultipartUploadInputSchema = z.object({
  key: z.string(),
  uploadId: z.string(),
  parts: z.array(z.object({
    partNumber: z.number(),
    etag: z.string(),
  })),
});

const AbortMultipartUploadInputSchema = z.object({
  key: z.string(),
  uploadId: z.string(),
});


export const videoRouter = createTRPCRouter({
  // Get presigned URL for direct upload to S3 (single part - for files < 10MB)
  getUploadUrl: publicProcedure
    .input(GetUploadUrlInputSchema)
    .mutation(async ({ input }) => {
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
    }),

  // Initialize multipart upload for large files (≥ 10MB)
  initMultipartUpload: publicProcedure
    .input(InitMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      try {
        const key = s3Service.generateUniqueKey(input.fileName, input.prefix || "uploads");
        const result = await s3Service.initializeMultipartUpload(key, input.contentType);
        
        return {
          success: true,
          ...result,
        };
      } catch (error) {
        console.error("Failed to initialize multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to initialize multipart upload",
        });
      }
    }),

  // Get presigned URLs for uploading multiple parts
  getPartUploadUrls: publicProcedure
    .input(GetPartUrlsInputSchema)
    .mutation(async ({ input }) => {
      try {
        const partUrls = await s3Service.getPresignedUploadPartUrls(
          input.key,
          input.uploadId,
          input.partNumbers,
          3600 // 1 hour expiry
        );
        
        return {
          success: true,
          partUrls,
        };
      } catch (error) {
        console.error("Failed to get part upload URLs:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get part upload URLs",
        });
      }
    }),

  // Complete multipart upload
  completeMultipartUpload: publicProcedure
    .input(CompleteMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await s3Service.completeMultipartUpload(
          input.key,
          input.uploadId,
          input.parts
        );
        
        return {
          success: true,
          ...result,
        };
      } catch (error) {
        console.error("Failed to complete multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to complete multipart upload",
        });
      }
    }),

  // Abort multipart upload (cleanup)
  abortMultipartUpload: publicProcedure
    .input(AbortMultipartUploadInputSchema)
    .mutation(async ({ input }) => {
      try {
        const result = await s3Service.abortMultipartUpload(input.key, input.uploadId);
        
        return {
          success: result,
        };
      } catch (error) {
        console.error("Failed to abort multipart upload:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to abort multipart upload",
        });
      }
    }),

}); 