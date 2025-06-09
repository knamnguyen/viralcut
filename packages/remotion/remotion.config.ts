import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setDelayRenderTimeoutInMilliseconds(300000); // 5 minutes for large video processing
 
// Note: Lambda timeout and memory cannot be configured in remotion.config.ts
// These must be set during function deployment via CLI parameters 