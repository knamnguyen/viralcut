import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  GetObjectCommandInput,
  S3ClientConfig,
} from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Readable } from "stream";

import { S3Config, S3UploadResult } from "./schema-validators";

/**
 * S3BucketService class for handling S3 bucket operations
 */
export class S3BucketService {
  private s3Client: S3Client;
  private bucket: string;

  constructor(config: S3Config) {
    const s3Config: S3ClientConfig = {
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    };

    this.s3Client = new S3Client(s3Config);
    this.bucket = config.bucket;
  }

  /**
   * Get the bucket name
   * @returns The bucket name
   */
  getBucket(): string {
    return this.bucket;
  }

  /**
   * Upload a file to S3
   * @param file - The file to upload (Buffer, Blob, or ReadableStream)
   * @param key - The key to save the file under (including folder prefix)
   * @param contentType - The content type of the file
   * @param metadata - Additional metadata to store with the file
   * @returns The upload result with key, bucket, and location
   */
  async uploadFile(
    file: Buffer | Blob | ReadableStream | Readable,
    key: string,
    contentType?: string,
    metadata?: Record<string, string>,
  ): Promise<S3UploadResult> {
    try {
      const upload = new Upload({
        client: this.s3Client,
        params: {
          Bucket: this.bucket,
          Key: key,
          Body: file,
          ContentType: contentType,
          Metadata: metadata,
        },
      });

      const result = await upload.done();

      return {
        key,
        bucket: this.bucket,
        location: `https://${this.bucket}.s3.${this.s3Client.config.region}.amazonaws.com/${key}`,
        etag: result.ETag?.replace(/"/g, ""), // Remove quotes from ETag
      };
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      throw new Error(`Failed to upload file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Download a file from S3
   * @param key - The key of the file to download
   * @returns The file as a buffer
   */
  async downloadFile(key: string): Promise<Buffer> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      const response = await this.s3Client.send(command);
      
      if (!response.Body) {
        throw new Error("Empty response body");
      }

      // Convert stream to buffer
      return await this.streamToBuffer(response.Body as Readable);
    } catch (error) {
      console.error("Error downloading file from S3:", error);
      throw new Error(`Failed to download file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Get a presigned URL for downloading a file
   * @param key - The key of the file
   * @param expiresIn - The number of seconds until the URL expires (default: 3600)
   * @returns The presigned URL
   */
  async getPresignedDownloadUrl(
    key: string,
    expiresIn = 3600,
  ): Promise<string> {
    try {
      const params: GetObjectCommandInput = {
        Bucket: this.bucket,
        Key: key,
      };

      const command = new GetObjectCommand(params);
      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error("Error generating presigned URL:", error);
      throw new Error(`Failed to generate presigned URL: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Get a presigned URL for uploading a file
   * @param key - The key to save the file under (including folder prefix)
   * @param contentType - The content type of the file
   * @param expiresIn - The number of seconds until the URL expires (default: 3600)
   * @returns The presigned URL
   */
  async getPresignedUploadUrl(
    key: string,
    contentType?: string,
    expiresIn = 3600,
  ): Promise<string> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ContentType: contentType,
      });

      return await getSignedUrl(this.s3Client, command, { expiresIn });
    } catch (error) {
      console.error("Error generating presigned upload URL:", error);
      throw new Error(`Failed to generate presigned upload URL: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Delete a file from S3
   * @param key - The key of the file to delete
   * @returns True if the file was deleted successfully
   */
  async deleteFile(key: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      console.error("Error deleting file from S3:", error);
      throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Check if a file exists in S3
   * @param key - The key of the file to check
   * @returns True if the file exists
   */
  async fileExists(key: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.bucket,
        Key: key,
      });

      await this.s3Client.send(command);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * List files in a bucket with optional prefix
   * @param prefix - The prefix to filter by (e.g., "uploads/", "processed/")
   * @param maxKeys - The maximum number of keys to return (default: 1000)
   * @returns Array of file keys
   */
  async listFiles(
    prefix?: string,
    maxKeys = 1000,
  ): Promise<string[]> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucket,
        Prefix: prefix,
        MaxKeys: maxKeys,
      });

      const response = await this.s3Client.send(command);
      
      if (!response.Contents) {
        return [];
      }

      return response.Contents.map((item) => item.Key || "").filter(Boolean);
    } catch (error) {
      console.error("Error listing files from S3:", error);
      throw new Error(`Failed to list files: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  /**
   * Generate a unique key for a file with folder prefix
   * @param fileName - The original file name
   * @param folder - The folder prefix (e.g., "uploads", "processed", "thumbnails")
   * @returns A unique key for the file
   */
  generateUniqueKey(fileName: string, folder = "uploads"): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 10);
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
    
    return `${folder}/${timestamp}-${randomString}-${sanitizedFileName}`;
  }

  /**
   * Convert a stream to a buffer
   * @param stream - The readable stream to convert
   * @returns A buffer containing the stream data
   */
  private async streamToBuffer(stream: Readable): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      
      stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on("error", (err) => reject(err));
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }
}

// Re-export schema validators
export * from "./schema-validators"; 