import { z } from "zod";

// S3 bucket configuration schema
export const s3ConfigSchema = z.object({
  region: z.string(),
  accessKeyId: z.string(),
  secretAccessKey: z.string(),
  bucket: z.string(),
});

export type S3Config = z.infer<typeof s3ConfigSchema>;

// S3 upload result schema
export const s3UploadResultSchema = z.object({
  key: z.string(),
  bucket: z.string(),
  location: z.string(),
  etag: z.string().optional(),
});

export type S3UploadResult = z.infer<typeof s3UploadResultSchema>;

// Video processing job schema
export const videoProcessingJobSchema = z.object({
  jobId: z.string(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  progress: z.number().min(0).max(100).default(0),
  originalKey: z.string(),
  processedKey: z.string().optional(),
  speedMultiplier: z.number().default(1),
  error: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type VideoProcessingJob = z.infer<typeof videoProcessingJobSchema>;

// S3 presigned URL request schema
export const presignedUrlRequestSchema = z.object({
  key: z.string(),
  contentType: z.string().optional(),
  expiresIn: z.number().optional(),
});

export type PresignedUrlRequest = z.infer<typeof presignedUrlRequestSchema>; 