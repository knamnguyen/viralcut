import React from "react";
import {
  AbsoluteFill,
  Video,
  useVideoConfig,
  staticFile,
} from "remotion";

interface VideoSpeedAdjustProps {
  videoUrl: string;
  speedMultiplier: number;
  durationInFrames?: number;
}

export const VideoSpeedAdjust: React.FC<VideoSpeedAdjustProps> = ({
  videoUrl,
  speedMultiplier = 1,
  durationInFrames,
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
      <Video
        src={videoUrl}
        style={{
          width: width,
          height: height,
          objectFit: "contain",
        }}
        playbackRate={speedMultiplier}
        volume={1}
      />
    </AbsoluteFill>
  );
}; 