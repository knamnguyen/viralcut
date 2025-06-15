import { z } from "zod";

// TikTok download configuration schema
export const tikTokDownloadConfigSchema = z.object({
  ytdlpPath: z.string().optional().default("yt-dlp"),
});

export type TikTokDownloadConfig = z.infer<typeof tikTokDownloadConfigSchema>;

// TikTok download options schema
export const tikTokDownloadOptionsSchema = z.object({
  username: z.string(),
  outputDir: z.string().optional(),
  format: z.string().optional(),
  writeDescription: z.boolean().optional().default(true),
  writeInfoJson: z.boolean().optional().default(true),
  maxVideos: z.number().optional(),
});

export type TikTokDownloadOptions = z.infer<typeof tikTokDownloadOptionsSchema>;

// TikTok download result schema
export const tikTokDownloadResultSchema = z.object({
  username: z.string(),
  totalDownloaded: z.number(),
  outputDir: z.string(),
  success: z.boolean(),
  error: z.string().optional(),
});

export type TikTokDownloadResult = z.infer<typeof tikTokDownloadResultSchema>; 