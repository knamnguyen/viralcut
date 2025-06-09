import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useVideoConfig,
  staticFile,
} from "remotion";

interface VideoSpeedAdjustProps {
  videoUrl: string;
  speedMultiplier: number;
}

export const VideoSpeedAdjust: React.FC<VideoSpeedAdjustProps> = ({
  videoUrl,
  speedMultiplier = 1,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <OffthreadVideo
        src={videoUrl}
        style={{
          width: width,
          height: height,
          objectFit: "contain",
        }}
        playbackRate={speedMultiplier}
        volume={1}
        delayRenderTimeoutInMilliseconds={300000} // 5 minutes for video loading
        delayRenderRetries={3} // Increased retries for large videos
      />
    </AbsoluteFill>
  );
}; 