import { spawn } from "child_process";
import { mkdir } from "fs/promises";
import { join } from "path";

import { 
  TikTokDownloadConfig, 
  TikTokDownloadOptions, 
  TikTokDownloadResult,
  tikTokDownloadConfigSchema,
  tikTokDownloadOptionsSchema 
} from "./schema-validators";

/**
 * TikTokDownloadService class for downloading TikTok videos using yt-dlp
 */
export class TikTokDownloadService {
  private config: TikTokDownloadConfig;
  private defaultOutputDir = "downloads";
  private defaultFormat = "%(title)s-%(id)s.%(ext)s";

  constructor(config?: Partial<TikTokDownloadConfig>) {
    this.config = tikTokDownloadConfigSchema.parse(config || {});
  }

  /**
   * Check if yt-dlp is available in the system
   * @returns Promise<boolean> - True if yt-dlp is available
   */
  async checkYtDlpAvailable(): Promise<boolean> {
    return new Promise((resolve) => {
      const check = spawn(this.config.ytdlpPath, ["--version"], { stdio: "pipe" });
      check.on("close", (code) => resolve(code === 0));
      check.on("error", () => resolve(false));
    });
  }

  /**
   * Download videos from a TikTok user
   * @param options - Download options including username, output directory, etc.
   * @returns Promise<TikTokDownloadResult> - Result of the download operation
   */
  async downloadUserVideos(options: TikTokDownloadOptions): Promise<TikTokDownloadResult> {
    // Validate options
    const validatedOptions = tikTokDownloadOptionsSchema.parse(options);

    // Check if yt-dlp is available
    const isYtDlpAvailable = await this.checkYtDlpAvailable();
    if (!isYtDlpAvailable) {
      return {
        username: validatedOptions.username,
        totalDownloaded: 0,
        outputDir: validatedOptions.outputDir || this.defaultOutputDir,
        success: false,
        error: `yt-dlp is not installed or not found in PATH. Please install it with: brew install yt-dlp`,
      };
    }

    const {
      username,
      outputDir = this.defaultOutputDir,
      format = this.defaultFormat,
      writeDescription = true,
      writeInfoJson = true,
      maxVideos,
    } = validatedOptions;

    // Clean username (remove @ if present)
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username;

    try {
      // Ensure output directory exists
      await mkdir(outputDir, { recursive: true });

      const outputPath = join(outputDir, format);
      const tiktokUrl = `https://www.tiktok.com/@${cleanUsername}`;

      console.log(`🎵 Downloading videos from TikTok user: @${cleanUsername}`);
      console.log(`📁 Videos will be saved to: ${outputDir}/`);
      console.log(`🔗 URL: ${tiktokUrl}`);
      console.log("⏳ Starting download...\n");

      const args = [tiktokUrl, "-o", outputPath, "--no-warnings"];

      if (writeDescription) {
        args.push("--write-description");
      }

      if (writeInfoJson) {
        args.push("--write-info-json");
      }

      if (maxVideos) {
        args.push("--max-downloads", maxVideos.toString());
      }

      const result = await this.executeDownload(args);

      return {
        username: cleanUsername,
        totalDownloaded: result.totalDownloaded,
        outputDir,
        success: result.success,
        error: result.error,
      };
    } catch (error) {
      console.error("Error in downloadUserVideos:", error);
      return {
        username: cleanUsername,
        totalDownloaded: 0,
        outputDir,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  /**
   * Execute the yt-dlp download command
   * @param args - Command line arguments for yt-dlp
   * @returns Promise with download result
   */
  private async executeDownload(args: string[]): Promise<{
    success: boolean;
    totalDownloaded: number;
    error?: string;
  }> {
    return new Promise((resolve) => {
      let downloadCount = 0;
      let hasError = false;
      let errorMessage = "";

      const ytdlp = spawn(this.config.ytdlpPath, args, {
        stdio: ["inherit", "pipe", "pipe"],
        shell: false,
      });

      // Track downloads from stdout
      ytdlp.stdout?.on("data", (data) => {
        const output = data.toString();
        process.stdout.write(output);
        
        // Count successful downloads
        if (output.includes("[download] 100%") || output.includes("has already been downloaded")) {
          downloadCount++;
        }
      });

      ytdlp.stderr?.on("data", (data) => {
        const error = data.toString();
        process.stderr.write(error);
        
        if (error.includes("ERROR")) {
          hasError = true;
          errorMessage += error;
        }
      });

      ytdlp.on("close", (code) => {
        if (code === 0 || code === 101) {
          // Code 0: Normal success
          // Code 101: Max downloads reached (also considered success)
          console.log("\n✅ Download completed!");
          if (code === 101) {
            console.log("🔢 Maximum number of videos reached.");
          }
          resolve({
            success: true,
            totalDownloaded: downloadCount,
          });
        } else {
          resolve({
            success: false,
            totalDownloaded: downloadCount,
            error: hasError ? errorMessage.trim() : `yt-dlp exited with code ${code}`,
          });
        }
      });

      ytdlp.on("error", (error) => {
        resolve({
          success: false,
          totalDownloaded: 0,
          error: `Failed to start yt-dlp: ${error.message}`,
        });
      });
    });
  }

  /**
   * Generate a unique output directory path
   * @param baseDir - Base directory path
   * @param username - TikTok username
   * @returns Unique directory path with timestamp
   */
  generateUniqueOutputDir(baseDir: string, username: string): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const cleanUsername = username.startsWith("@") ? username.slice(1) : username;
    return join(baseDir, `${cleanUsername}-${timestamp}`);
  }
}

// Re-export schema validators
export * from "./schema-validators"; 