import type { AwsRegion } from "@remotion/lambda/client";
import {
  getFunctions,
  getRenderProgress,
  getSites,
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { REMOTION_CONFIG } from "@sassy/remotion/config";

// Type-safe AWS region with fallback - using Remotion-specific env vars
const REGION = (process.env.REMOTION_AWS_REGION || "us-west-2") as AwsRegion;

export interface VideoProcessingRequest {
  videoUrl: string;
  speedMultiplier: number;
  originalDuration: number;
}

export interface RemotionRenderResult {
  renderId: string;
  bucketName: string;
  success: boolean;
  message: string;
}

export interface RemotionProgress {
  done: boolean;
  progress: number;
  outputFile?: string;
  outputBucket?: string;
  costs?: any;
  errors?: any[];
  fatalErrorEncountered?: boolean;
}

export interface VideoStitchRequest {
  videoUrl: string;
  clips: Array<{
    range: string;
    caption: string;
  }>;
  originalDuration: number;
}

export class RemotionService {
  private region: AwsRegion;

  constructor() {
    this.region = REGION;
  }

  /**
   * Calculate practical framesPerLambda - optimized to avoid AWS concurrency limits
   * @param durationInFrames Total frames in the video
   * @returns Practical framesPerLambda setting that avoids concurrency limits
   */
  private calculatePracticalFramesPerLambda(durationInFrames: number): number {
    // NEW AGGRESSIVE STRATEGY: 200 frames per Lambda for speed across the board
    // Maximum 400 frames per Lambda to stay under 50 Lambda functions
    
    const targetFramesPerLambda = 200; // 6.67 seconds of video at 30fps
    const maxFramesPerLambda = 400; // 13.33 seconds of video at 30fps  
    const maxAllowedLambdas = 50; // Hard limit
    
    // Calculate how many Lambdas we'd need with target frames
    const calculatedLambdaCount = Math.ceil(durationInFrames / targetFramesPerLambda);
    
    let finalFramesPerLambda: number;
    let finalLambdaCount: number;
    
    if (calculatedLambdaCount <= maxAllowedLambdas) {
      // We can use target frames per Lambda
      finalFramesPerLambda = targetFramesPerLambda;
      finalLambdaCount = calculatedLambdaCount;
    } else {
      // We need to increase frames per Lambda to stay under limit
      finalFramesPerLambda = Math.min(
        Math.ceil(durationInFrames / maxAllowedLambdas),
        maxFramesPerLambda
      );
      finalLambdaCount = Math.ceil(durationInFrames / finalFramesPerLambda);
    }
    
    const videoSecondsPerLambda = finalFramesPerLambda / 30;
    
    console.log("AGGRESSIVE SPEED STRATEGY:", {
      durationInFrames,
      totalVideoDuration: `${(durationInFrames / 30 / 60).toFixed(1)} minutes`,
      targetFramesPerLambda,
      maxFramesPerLambda,
      maxAllowedLambdas,
      finalFramesPerLambda,
      finalLambdaCount,
      videoSecondsPerLambda: `${videoSecondsPerLambda.toFixed(1)} seconds of video per Lambda`,
      strategy: "200 frames/Lambda for speed, max 400 frames to stay under 50 Lambdas",
      concurrency: "Will use concurrencyPerLambda: 3 for parallel processing"
    });
    
    return finalFramesPerLambda;
  }

  /**
   * Calculate optimal framesPerLambda based on video duration and concurrency constraints
   * @param durationInFrames Total frames in the video
   * @param expectedConcurrentUsers Expected number of simultaneous users
   * @param accountConcurrencyLimit Your AWS account concurrency limit (default: 1000)
   * @returns Optimal framesPerLambda setting
   */
  private calculateOptimalFramesPerLambda(
    durationInFrames: number, 
    expectedConcurrentUsers: number = 10,
    accountConcurrencyLimit: number = 1000
  ): number {
    // For very short videos or low concurrency scenarios, use config default
    if (durationInFrames <= 100 || expectedConcurrentUsers <= 1) {
      return REMOTION_CONFIG.framesPerLambda;
    }

    // Reserve some concurrency for other functions (20% buffer)
    const availableConcurrency = Math.floor(accountConcurrencyLimit * 0.8);
    
    // Calculate max concurrency per video render
    const maxConcurrencyPerRender = Math.floor(availableConcurrency / expectedConcurrentUsers);
    
    // Ensure we don't exceed Remotion's 200 function limit
    const maxAllowedConcurrency = Math.min(maxConcurrencyPerRender, 200);
    
    // Calculate framesPerLambda, ensuring minimum of 4 and using config as fallback
    const calculatedFramesPerLambda = Math.max(
      Math.ceil(durationInFrames / maxAllowedConcurrency),
      4
    );
    
    // Use the larger of calculated value or config default to avoid over-parallelization
    const framesPerLambda = Math.max(calculatedFramesPerLambda, REMOTION_CONFIG.framesPerLambda);
    
    console.log("FramesPerLambda calculation:", {
      durationInFrames,
      expectedConcurrentUsers,
      accountConcurrencyLimit,
      availableConcurrency,
      maxConcurrencyPerRender,
      maxAllowedConcurrency,
      calculatedFramesPerLambda,
      configDefault: REMOTION_CONFIG.framesPerLambda,
      finalFramesPerLambda: framesPerLambda
    });
    
    return framesPerLambda;
  }

  /**
   * Get available Remotion Lambda functions
   */
  async getFunctions() {
    return await getFunctions({
      region: this.region,
      compatibleOnly: false,
    });
    // return await speculateFunctionName({
    //   memorySizeInMb: 3008,
    //   diskSizeInMb: 2048,
    //   timeoutInSeconds: 900,
    // })
  }

  /**
   * Get deployed Remotion sites
   */
  async getSites() {
    return await getSites({
      region: this.region,
    });
  }

  /**
   * Find the viralcut-demo site
   */
  async getViralCutSite() {
    const sites = await this.getSites();
    const demoSite = sites.sites.find(
      (site) => site.id === "viralcut-demo",
    );
    
    if (!demoSite) {
      throw new Error(
        "ViralCut demo site not found. Please deploy the site first using 'pnpm remotion:sites:create'."
      );
    }
    
    return demoSite;
  }

  /**
   * Start video speed adjustment processing
   */
  async processVideoSpeed(request: VideoProcessingRequest): Promise<RemotionRenderResult> {

    console.log("process video triggered");
    try {
      // Get deployed functions
      const functions = await this.getFunctions();
      
      if (functions.length === 0) {
        throw new Error(
          "No Remotion Lambda functions found. Please deploy a function first."
        );
      }

      const functionName = functions[0]?.functionName;
      if (!functionName) {
        throw new Error("Function name is undefined");
      }

      // Get the viralcut demo site
      const demoSite = await this.getViralCutSite();

      console.log("starting remotion processing inside service ");
      console.log("functions", functions);
      console.log("functionName", functionName);
      console.log("demoSite", demoSite);
      console.log("request", request);
      console.log("region", this.region);
      console.log("serveUrl", demoSite.serveUrl);
      console.log("composition", "VideoSpeedAdjust");
      console.log("inputProps", {
        videoUrl: request.videoUrl,
        speedMultiplier: request.speedMultiplier,
      });
      console.log("codec", "h264");

      // Calculate the correct duration in frames based on speed multiplier
      const originalDurationInSeconds = request.originalDuration;
      const adjustedDurationInSeconds = originalDurationInSeconds / request.speedMultiplier;
      const fps = 30;
      const durationInFrames = Math.ceil(adjustedDurationInSeconds * fps);
      
      // Use practical framesPerLambda for simple scenarios
      // const practicalFramesPerLambda = this.calculatePracticalFramesPerLambda(durationInFrames);
      
      // Let Remotion choose optimal framesPerLambda based on video length
      // This follows Remotion's built-in concurrency optimization that interpolates
      // between 75-150 concurrency based on frame count and ensures minimum 20 frames per Lambda
      const practicalFramesPerLambda = undefined; // Use Remotion's default optimization
      
      console.log("Duration calculations:", {
        originalDurationInSeconds,
        adjustedDurationInSeconds,
        fps,
        durationInFrames,
        speedMultiplier: request.speedMultiplier,
        practicalFramesPerLambda: "undefined (using Remotion defaults)",
        note: "Letting Remotion optimize concurrency automatically"
      });

      // Render video on Lambda with optimized settings for long videos
      const renderResult = await renderMediaOnLambda({
        region: this.region,
        functionName,
        serveUrl: demoSite.serveUrl,
        composition: "VideoSpeedAdjust",
        inputProps: {
          videoUrl: request.videoUrl,
          speedMultiplier: request.speedMultiplier,
        },
        codec: "h264",
        imageFormat: "jpeg",
        maxRetries: 1,
        framesPerLambda: practicalFramesPerLambda,
        concurrencyPerLambda: 1, // Single browser tab for better video processing performance
        privacy: "public",
        // Increase timeout significantly for large video processing  
        timeoutInMilliseconds: 3000000, 
        // Add verbose logging for debugging
        logLevel: "verbose",
      });

      const { renderId, bucketName } = renderResult;
      
      // Log debugging information
      console.log("🔍 DEBUGGING INFO:");
      console.log("CloudWatch Logs:", renderResult.cloudWatchLogs);
      console.log("S3 Console Folder:", renderResult.folderInS3Console);
      console.log("Render ID:", renderId);
      console.log("Bucket Name:", bucketName);

      return {
        renderId,
        bucketName,
        success: true,
        message: "Video speed adjustment started successfully",
      };
    } catch (error) {
      console.error("Error processing video speed:", error);
      throw new Error(
        `Failed to process video speed: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Get render progress for a video processing job
   */
  async getRenderProgress(renderId: string, bucketName: string): Promise<RemotionProgress> {
    console.log("getRenderProgress called with:", { renderId, bucketName, region: this.region });
    
    try {
      // Get deployed functions
      console.log("Getting functions for progress check...");
      const functions = await this.getFunctions();
      console.log("Functions found for progress:", functions.map(f => ({ name: f.functionName, version: f.version })));

      if (functions.length === 0) {
        throw new Error("No Remotion Lambda functions found.");
      }

      const functionName = functions[0]?.functionName;
      if (!functionName) {
        throw new Error("Function name is undefined");
      }

      console.log("Calling getRenderProgress with:", { renderId, bucketName, functionName, region: this.region });
      
      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: this.region,
      });

      console.log("Progress result:", {
        done: progress.done,
        progress: progress.overallProgress,
        outputFile: progress.outputFile,
        errors: progress.errors,
        fatalErrorEncountered: progress.fatalErrorEncountered,
        // Additional debugging info
        chunks: progress.chunks,
        timeToFinish: progress.timeToFinish,
        renderId: progress.renderId,
        bucket: progress.bucket
      });

      // If progress is stuck, log additional debugging info
      if (!progress.done && progress.overallProgress > 0 && progress.overallProgress < 1) {
        console.log("🚨 RENDER APPEARS STUCK - DEBUGGING INFO:");
        console.log("Progress percentage:", (progress.overallProgress * 100).toFixed(1) + "%");
        console.log("Chunks info:", progress.chunks);
        console.log("Time to finish estimate:", progress.timeToFinish);
        console.log("Errors so far:", progress.errors);
        
        // Log the full progress object to see all available properties
        console.log("Full progress object:", JSON.stringify(progress, null, 2));
      }

      return {
        done: progress.done,
        progress: progress.overallProgress,
        outputFile: progress.outputFile || undefined,
        outputBucket: progress.outBucket || undefined,
        costs: progress.costs,
        errors: progress.errors,
        fatalErrorEncountered: progress.fatalErrorEncountered,
      };
    } catch (error) {
      console.error("Error getting render progress:", error);
      throw new Error(
        `Failed to get render progress: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Start video stitch processing
   */
  async processVideoStitch(request: VideoStitchRequest): Promise<RemotionRenderResult> {
    console.log("processVideoStitch triggered");
    try {
      // Get deployed functions
      const functions = await this.getFunctions();
      
      if (functions.length === 0) {
        throw new Error(
          "No Remotion Lambda functions found. Please deploy a function first."
        );
      }

      const functionName = functions[0]?.functionName;
      if (!functionName) {
        throw new Error("Function name is undefined");
      }

      // Get the viralcut demo site
      const demoSite = await this.getViralCutSite();

      console.log("starting video stitch processing inside service");
      console.log("functions", functions);
      console.log("functionName", functionName);
      console.log("demoSite", demoSite);
      console.log("request", request);
      console.log("region", this.region);
      console.log("serveUrl", demoSite.serveUrl);
      console.log("composition", "VideoStitch");
      console.log("inputProps", {
        videoUrl: request.videoUrl,
        clips: request.clips,
      });
      console.log("codec", "h264");

      // Calculate the total duration based on clip durations inline
      let totalClipDurationSeconds = 0;
      for (const clip of request.clips) {
        const [startStr, endStr] = clip.range.split('-');
        if (startStr && endStr) {
          const startParts = startStr.trim().split(':').map(Number);
          const endParts = endStr.trim().split(':').map(Number);
          
          let startSeconds = 0;
          let endSeconds = 0;
          
          if (startParts.length === 2) {
            startSeconds = startParts[0]! * 60 + startParts[1]!;
          }
          if (endParts.length === 2) {
            endSeconds = endParts[0]! * 60 + endParts[1]!;
          }
          
          totalClipDurationSeconds += (endSeconds - startSeconds);
        }
      }
      const fps = 30;
      const durationInFrames = Math.ceil(totalClipDurationSeconds * fps);
      
      // Use Remotion's default optimization for framesPerLambda
      const practicalFramesPerLambda = undefined;
      
      console.log("VideoStitch duration calculations:", {
        totalClipDurationSeconds,
        fps,
        durationInFrames,
        clipCount: request.clips.length,
        practicalFramesPerLambda: "undefined (using Remotion defaults)",
        note: "Letting Remotion optimize concurrency automatically"
      });

      // Render video on Lambda with optimized settings
      const renderResult = await renderMediaOnLambda({
        region: this.region,
        functionName,
        serveUrl: demoSite.serveUrl,
        composition: "VideoStitch",
        inputProps: {
          videoUrl: request.videoUrl,
          clips: request.clips,
        },
        codec: "h264",
        imageFormat: "jpeg",
        maxRetries: 1,
        framesPerLambda: practicalFramesPerLambda,
        concurrencyPerLambda: 1, // Single browser tab for better video processing performance
        privacy: "public",
        // Increase timeout for video stitching
        timeoutInMilliseconds: 3000000, 
        // Add verbose logging for debugging
        logLevel: "verbose",
      });

      const { renderId, bucketName } = renderResult;
      
      // Log debugging information
      console.log("🔍 VideoStitch DEBUGGING INFO:");
      console.log("CloudWatch Logs:", renderResult.cloudWatchLogs);
      console.log("S3 Console Folder:", renderResult.folderInS3Console);
      console.log("Render ID:", renderId);
      console.log("Bucket Name:", bucketName);

      return {
        renderId,
        bucketName,
        success: true,
        message: "Video stitch processing started successfully",
      };
    } catch (error) {
      console.error("Error processing video stitch:", error);
      throw new Error(
        `Failed to process video stitch: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  /**
   * Generate download URL for processed video
   */
  generateDownloadUrl(outputBucket: string, outputFile: string): string {
    return `https://${outputBucket}.s3.${this.region}.amazonaws.com/${outputFile}`;
  }
} 