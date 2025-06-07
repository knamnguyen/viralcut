import type { AwsRegion } from "@remotion/lambda/client";
import {
  getFunctions,
  getRenderProgress,
  getSites,
  renderMediaOnLambda,
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
    // Conservative approach: Target max 20-30 Lambda functions to avoid concurrency limits
    // Most AWS accounts have default concurrency limit of 1000, but we want to be safe
    const maxDesiredLambdas = 25;
    
    // Calculate frames per Lambda to stay under the limit
    const calculatedFramesPerLambda = Math.ceil(durationInFrames / maxDesiredLambdas);
    
    // For very long videos, ensure each Lambda processes at least 10 seconds but not more than 30 seconds
    const minFramesPerLambda = 300; // 10 seconds at 30fps
    const maxFramesPerLambda = 900; // 30 seconds at 30fps
    
    // Clamp the value between min and max
    const finalFramesPerLambda = Math.max(
      minFramesPerLambda,
      Math.min(calculatedFramesPerLambda, maxFramesPerLambda)
    );
    
    const actualLambdaCount = Math.ceil(durationInFrames / finalFramesPerLambda);
    const processingTimePerLambda = finalFramesPerLambda / 30;
    
    console.log("Conservative framesPerLambda calculation:", {
      durationInFrames,
      totalVideoDuration: `${(durationInFrames / 30 / 60).toFixed(1)} minutes`,
      maxDesiredLambdas,
      calculatedFramesPerLambda,
      finalFramesPerLambda,
      actualLambdaCount,
      processingTimePerLambda: `${processingTimePerLambda.toFixed(1)} seconds of video per Lambda`,
      expectedWithinTimeout: processingTimePerLambda < 300 ? "✅ Yes" : "❌ No - increase timeout"
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
      compatibleOnly: true,
    });
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
      const practicalFramesPerLambda = this.calculatePracticalFramesPerLambda(durationInFrames);
      
      console.log("Duration calculations:", {
        originalDurationInSeconds,
        adjustedDurationInSeconds,
        fps,
        durationInFrames,
        speedMultiplier: request.speedMultiplier,
        practicalFramesPerLambda,
        expectedLambdaCount: Math.ceil(durationInFrames / practicalFramesPerLambda)
      });

      // Render video on Lambda with optimized settings for long videos
      const { renderId, bucketName } = await renderMediaOnLambda({
        region: this.region,
        functionName,
        serveUrl: demoSite.serveUrl,
        composition: "VideoSpeedAdjust",
        inputProps: {
          videoUrl: request.videoUrl,
          speedMultiplier: request.speedMultiplier,
          durationInFrames,
        },
        codec: "h264",
        imageFormat: "jpeg",
        maxRetries: 1,
        framesPerLambda: practicalFramesPerLambda,
        privacy: "public",
        // Use updated timeout settings for long video processing
        timeoutInMilliseconds: REMOTION_CONFIG.timeoutInSeconds * 1000,
      });

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
    try {
      // Get deployed functions
      const functions = await this.getFunctions();

      if (functions.length === 0) {
        throw new Error("No Remotion Lambda functions found.");
      }

      const functionName = functions[0]?.functionName;
      if (!functionName) {
        throw new Error("Function name is undefined");
      }

      const progress = await getRenderProgress({
        renderId,
        bucketName,
        functionName,
        region: this.region,
      });

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
   * Generate download URL for processed video
   */
  generateDownloadUrl(outputBucket: string, outputFile: string): string {
    return `https://${outputBucket}.s3.${this.region}.amazonaws.com/${outputFile}`;
  }
} 