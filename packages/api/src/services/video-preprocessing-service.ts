import { S3BucketService } from "@sassy/s3";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { TRPCError } from "@trpc/server";

export interface VideoSegment {
  segmentIndex: number;
  startTime: number;
  duration: number;
  s3Key: string;
  s3Url: string;
}

export interface VideoPreprocessingResult {
  originalVideoUrl: string;
  segments: VideoSegment[];
  totalDuration: number;
  segmentDuration: number;
  totalSegments: number;
  preprocessingId: string;
}

export class VideoPreprocessingService {
  private s3Service: S3BucketService;

  constructor() {
    this.s3Service = new S3BucketService({
      region: process.env.AWS_REGION || "us-west-2",
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      bucket: process.env.S3_BUCKET || "viralcut-s3bucket",
    });
  }

  /**
   * Split a video into segments for efficient Lambda processing
   */
  async preprocessVideo(
    videoUrl: string, 
    originalDuration: number,
    segmentDurationMinutes: number = 2 // 2-minute segments for faster processing
  ): Promise<VideoPreprocessingResult> {
    const segmentDuration = segmentDurationMinutes * 60; // Convert to seconds
    const totalSegments = Math.ceil(originalDuration / segmentDuration);
    const preprocessingId = `preprocessing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    console.log("🎬 Starting video preprocessing:", {
      videoUrl,
      originalDuration: `${originalDuration}s (${(originalDuration / 60).toFixed(1)} min)`,
      segmentDuration: `${segmentDuration}s (${segmentDurationMinutes} min)`,
      totalSegments,
      preprocessingId
    });

    try {
      // Create temporary directory for processing
      const tempDir = path.join('/tmp', preprocessingId);
      fs.mkdirSync(tempDir, { recursive: true });

      // Download original video to temp directory
      const originalVideoPath = path.join(tempDir, 'original.mp4');
      console.log("📥 Downloading original video...");
      
      const downloadStart = Date.now();
      execSync(`curl -L "${videoUrl}" -o "${originalVideoPath}"`, {
        stdio: 'inherit',
        timeout: 300000 // 5 minutes timeout
      });
      const downloadTime = Date.now() - downloadStart;
      
      const fileSize = fs.statSync(originalVideoPath).size;
      console.log(`✅ Download complete: ${(fileSize / 1024 / 1024).toFixed(1)}MB in ${downloadTime}ms`);

      const segments: VideoSegment[] = [];

      // Split video into segments using FFmpeg
      for (let i = 0; i < totalSegments; i++) {
        const startTime = i * segmentDuration;
        const actualDuration = Math.min(segmentDuration, originalDuration - startTime);
        const segmentPath = path.join(tempDir, `segment_${i}.mp4`);
        
        console.log(`🔄 Creating segment ${i + 1}/${totalSegments} (${startTime}s - ${startTime + actualDuration}s)`);
        
        const segmentStart = Date.now();
        
        try {
          // Use FFmpeg to create segment with copy (fastest)
          const ffmpegCmd = `ffmpeg -ss ${startTime} -i "${originalVideoPath}" -t ${actualDuration} -c copy -avoid_negative_ts make_zero "${segmentPath}"`;
          execSync(ffmpegCmd, { stdio: 'pipe', timeout: 60000 }); // 1 minute per segment
        } catch (error) {
          console.warn(`⚠️  Segment ${i} creation failed with copy codec, trying with re-encoding...`);
          // Fallback to re-encoding if copy fails
          const fallbackCmd = `ffmpeg -ss ${startTime} -i "${originalVideoPath}" -t ${actualDuration} -c:v libx264 -c:a aac -preset ultrafast "${segmentPath}"`;
          execSync(fallbackCmd, { stdio: 'pipe', timeout: 120000 });
        }

        const segmentTime = Date.now() - segmentStart;
        
        // Check if segment was created successfully
        if (!fs.existsSync(segmentPath) || fs.statSync(segmentPath).size === 0) {
          throw new Error(`Failed to create segment ${i}`);
        }

        // Upload segment to S3
        const segmentBuffer = fs.readFileSync(segmentPath);
        const segmentKey = `segments/${preprocessingId}/segment_${i}.mp4`;
        
        console.log(`📤 Uploading segment ${i + 1} (${(segmentBuffer.length / 1024 / 1024).toFixed(1)}MB)...`);
        const uploadResult = await this.s3Service.uploadFile(
          segmentBuffer,
          segmentKey,
          'video/mp4'
        );

        segments.push({
          segmentIndex: i,
          startTime,
          duration: actualDuration,
          s3Key: segmentKey,
          s3Url: uploadResult.location
        });

        console.log(`✅ Segment ${i + 1} completed in ${segmentTime}ms`);

        // Clean up local segment file immediately to save space
        fs.unlinkSync(segmentPath);
      }

      // Clean up temp directory
      fs.rmSync(tempDir, { recursive: true, force: true });

      const result = {
        originalVideoUrl: videoUrl,
        segments,
        totalDuration: originalDuration,
        segmentDuration,
        totalSegments: segments.length,
        preprocessingId
      };

      console.log("🎉 Video preprocessing completed successfully:", {
        preprocessingId,
        totalSegments: segments.length,
        totalSize: `${(segments.reduce((sum, s) => sum + (fs.existsSync(s.s3Key) ? 0 : 0), 0) / 1024 / 1024).toFixed(1)}MB`,
        segmentDuration: `${segmentDuration}s`,
        segments: segments.map(s => ({ 
          index: s.segmentIndex, 
          duration: `${s.duration}s`,
          size: "uploaded"
        }))
      });

      return result;

    } catch (error) {
      console.error("❌ Video preprocessing failed:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Video preprocessing failed: ${error instanceof Error ? error.message : "Unknown error"}`
      });
    }
  }

  /**
   * Clean up video segments after processing is complete
   */
  async cleanupSegments(segments: VideoSegment[]): Promise<void> {
    console.log(`🧹 Cleaning up ${segments.length} video segments...`);
    
    const cleanupPromises = segments.map(async (segment) => {
      try {
        await this.s3Service.deleteFile(segment.s3Key);
        console.log(`🗑️  Deleted segment: ${segment.s3Key}`);
      } catch (error) {
        console.warn(`⚠️  Failed to delete segment ${segment.s3Key}:`, error);
      }
    });

    await Promise.all(cleanupPromises);
    console.log("✅ Segment cleanup completed");
  }

  /**
   * Get preprocessing status and segments
   */
  async getPreprocessingResult(preprocessingId: string): Promise<VideoPreprocessingResult | null> {
    // In a real implementation, you might store this in a database
    // For now, we'll return null as this is mainly used for the preprocessing flow
    return null;
  }
} 