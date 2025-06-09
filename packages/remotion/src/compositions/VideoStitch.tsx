import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  Sequence,
  useVideoConfig,
} from "remotion";
import type { VideoStitchClip } from "../schema-validators";
import { parseTimeRange, secondsToFrames } from "../utils/time-parsing";

interface VideoStitchProps {
  videoUrl: string;
  clips: VideoStitchClip[];
}

export const VideoStitch: React.FC<VideoStitchProps> = ({
  videoUrl,
  clips,
}) => {
  const { width, height, fps } = useVideoConfig();

  let currentFrame = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {clips.map((clip, index) => {
        const { startSeconds, endSeconds } = parseTimeRange(clip.range);
        const startFrame = secondsToFrames(startSeconds, fps);
        const endFrame = secondsToFrames(endSeconds, fps);
        const clipDurationInFrames = endFrame - startFrame;

        const sequenceProps = {
          from: currentFrame,
          durationInFrames: clipDurationInFrames,
        };

        // Update currentFrame for next clip
        currentFrame += clipDurationInFrames;

        return (
          <Sequence key={index} {...sequenceProps}>
            <AbsoluteFill>
              {/* Video with trimming */}
              <OffthreadVideo
                src={videoUrl}
                startFrom={startFrame}
                endAt={endFrame}
                style={{
                  width: width,
                  height: height,
                  objectFit: "contain",
                }}
                volume={1}
                delayRenderTimeoutInMilliseconds={300000}
                delayRenderRetries={3}
              />
              
              {/* Text overlay */}
              {clip.caption && (
                <AbsoluteFill
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "40px",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "16px 24px",
                      borderRadius: "8px",
                      fontSize: Math.min(width / 25, 48),
                      fontFamily: "SF Pro Display, system-ui, sans-serif",
                      fontWeight: "600",
                      textAlign: "center",
                      maxWidth: width * 0.8,
                      wordWrap: "break-word",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                      border: "2px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {clip.caption}
                  </div>
                </AbsoluteFill>
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}; 