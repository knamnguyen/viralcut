#!/usr/bin/env bun

import { join } from "path";
import { TikTokDownloadService } from "../src/index";

interface TestDownloadArgs {
  username?: string;
  maxVideos?: number;
}

function parseArgs(): TestDownloadArgs {
  const args = process.argv.slice(2);
  const result: TestDownloadArgs = {};

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    switch (arg) {
      case "--username":
      case "-u":
        if (i + 1 < args.length) {
          result.username = args[++i];
        }
        break;
      case "--max-videos":
      case "-m":
        if (i + 1 < args.length) {
          const value = args[++i];
          if (value) result.maxVideos = parseInt(value, 10);
        }
        break;
    }
  }

  return result;
}

function printUsage(): void {
  console.log("\n🎵 TikTok Download Service Test\n");
  console.log("Usage:");
  console.log("  pnpm test-download --username <username> [--max-videos <number>]\n");
  console.log("Options:");
  console.log("  --username, -u    TikTok username (with or without @)");
  console.log("  --max-videos, -m  Maximum number of videos to download (optional)\n");
  console.log("Examples:");
  console.log("  pnpm test-download --username myuser");
  console.log("  pnpm test-download -u @myuser --max-videos 5");
  console.log("  pnpm test-download -u myuser -m 3\n");
}

async function main(): Promise<void> {
  const args = parseArgs();

  if (!args.username) {
    console.error("❌ Error: Username is required");
    printUsage();
    process.exit(1);
  }

  try {
    console.log("🚀 Initializing TikTok Download Service...\n");
    
    const service = new TikTokDownloadService();
    
    // Use the downloads folder within the package
    const outputDir = join(process.cwd(), "downloads");
    
    const result = await service.downloadUserVideos({
      username: args.username,
      outputDir,
      maxVideos: args.maxVideos,
      writeDescription: true,
      writeInfoJson: true,
    });

    console.log("\n📊 Download Summary:");
    console.log(`   Username: @${result.username}`);
    console.log(`   Output Dir: ${result.outputDir}`);
    console.log(`   Videos Downloaded: ${result.totalDownloaded}`);
    console.log(`   Success: ${result.success ? "✅" : "❌"}`);
    
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }

    if (result.success && result.totalDownloaded > 0) {
      console.log(`\n📂 Check the downloads folder for your videos!`);
    }

    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error("\n❌ Unexpected error:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

// Run the script
main(); 