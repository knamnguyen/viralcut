// AWS Configuration for Remotion Lambda
export const AWS_CONFIG = {
  region: process.env.REMOTION_AWS_REGION || "us-west-2",
  accessKeyId: process.env.REMOTION_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REMOTION_AWS_SECRET_ACCESS_KEY,
} as const;

// Remotion Lambda Configuration
export const REMOTION_CONFIG = {
  functionName:
    process.env.REMOTION_LAMBDA_FUNCTION_NAME || "remotion-render-hello-world",
  siteName: "hello-world-demo",
  timeoutInSeconds: 120,
  memorySizeInMb: 2048,
  maxRetries: 1,
  framesPerLambda: 20,
} as const;

// Video Configuration
export const VIDEO_CONFIG = {
  codec: "h264" as const,
  imageFormat: "jpeg" as const,
  privacy: "public" as const,
  deleteAfter: "1-day" as const,
} as const;
