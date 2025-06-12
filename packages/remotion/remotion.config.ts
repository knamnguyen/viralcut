import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setDelayRenderTimeoutInMilliseconds(300000); // 5 minutes for large video processing

Config.overrideWebpackConfig((currentConfiguration) => {
  return enableTailwind(currentConfiguration);
});
 
// Note: Lambda timeout and memory cannot be configured in remotion.config.ts
// These must be set during function deployment via CLI parameters 