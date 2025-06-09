import React from "react";
import { Composition, registerRoot } from "remotion";

import { HelloWorld } from "./compositions/HelloWorld";
import { VideoSpeedAdjust } from "./compositions/VideoSpeedAdjust";
import { VideoStitch } from "./compositions/VideoStitch";
import { calculateTotalClipDuration, validateTimeRanges } from "./utils/time-parsing";
import type { VideoStitchInput } from "./schema-validators";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150} // 5 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          text: "Hello World!",
        }}
      />
      <Composition
        id="VideoSpeedAdjust"
        component={VideoSpeedAdjust as any}
        durationInFrames={300} // Default fallback
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoUrl: "https://example.com/video.mp4",
          speedMultiplier: 0.5,
        }}
        calculateMetadata={async ({ props }) => {
          if (!props.videoUrl || props.videoUrl === "https://example.com/video.mp4") {
            // Use default for placeholder video
            return {
              durationInFrames: 300,
              fps: 30,
              width: 1920,
              height: 1080,
            };
          }

          // Use parseMedia() which works in Node.js/server environments
          const { parseMedia } = await import('@remotion/media-parser');
          
          try {
            console.log('Parsing video metadata with parseMedia()...');
            const { durationInSeconds } = await parseMedia({
              src: props.videoUrl,
              fields: {
                durationInSeconds: true,
              },
              acknowledgeRemotionLicense: true,
            });
            
            if (durationInSeconds === null) {
              throw new Error('Could not determine video duration');
            }
            
            const fps = 30;
            const originalDurationInFrames = Math.ceil(durationInSeconds * fps);
            const adjustedDurationInFrames = Math.ceil(originalDurationInFrames / (props.speedMultiplier || 1));
            
            console.log('Video metadata parsed successfully:', {
              originalDuration: durationInSeconds,
              originalFrames: originalDurationInFrames,
              speedMultiplier: props.speedMultiplier,
              adjustedFrames: adjustedDurationInFrames,
              finalDurationMinutes: (adjustedDurationInFrames / fps) / 60,
            });
            
            return {
              durationInFrames: adjustedDurationInFrames,
              fps,
              width: 1920,
              height: 1080,
            };
          } catch (error) {
            console.warn('Failed to parse video metadata, using default:', error);
            // Fallback to a reasonable default for large videos
            return {
              durationInFrames: 18000, // 10 minutes at 30fps as fallback
              fps: 30,
              width: 1920,
              height: 1080,
            };
          }
        }}
      />
      <Composition
        id="VideoStitch"
        component={VideoStitch as any}
        durationInFrames={300} // Default fallback
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoUrl: "https://example.com/video.mp4",
          clips: [
            {
              range: "00:05-00:15",
              caption: "This is a great clip!"
            },
            {
              range: "00:30-00:45", 
              caption: "Another amazing moment!"
            }
          ],
        }}
        calculateMetadata={async ({ props }) => {
          const typedProps = props as VideoStitchInput;
          
          if (!typedProps.videoUrl || typedProps.videoUrl === "https://example.com/video.mp4") {
            // Use default for placeholder video
            return {
              durationInFrames: 300,
              fps: 30,
              width: 1920,
              height: 1080,
            };
          }

          // Use parseMedia() which works in Node.js/server environments
          const { parseMedia } = await import('@remotion/media-parser');
          
          try {
            console.log('Parsing video metadata for VideoStitch...');
            const { durationInSeconds } = await parseMedia({
              src: typedProps.videoUrl,
              fields: {
                durationInSeconds: true,
              },
              acknowledgeRemotionLicense: true,
            });
            
            if (durationInSeconds === null) {
              throw new Error('Could not determine video duration');
            }
            
            // Validate clip ranges are within video bounds and meet requirements
            const clipRanges = typedProps.clips.map(clip => clip.range);
            const validation = validateTimeRanges(clipRanges, durationInSeconds);
            
            if (!validation.isValid) {
              throw new Error(`Invalid clips: ${validation.errors.join(', ')}`);
            }
            
            // Calculate total duration from all clips
            const totalClipDurationSeconds = calculateTotalClipDuration(clipRanges);
            const fps = 30;
            const totalDurationInFrames = Math.ceil(totalClipDurationSeconds * fps);
            
            console.log('VideoStitch metadata calculated successfully:', {
              originalVideoDuration: durationInSeconds,
              totalClipDuration: totalClipDurationSeconds,
              totalFrames: totalDurationInFrames,
              clipCount: typedProps.clips.length,
            });
            
            return {
              durationInFrames: totalDurationInFrames,
              fps,
              width: 1920,
              height: 1080,
            };
          } catch (error) {
            console.warn('Failed to parse video metadata for VideoStitch, using default:', error);
            // Fallback to a reasonable default
            return {
              durationInFrames: 900, // 30 seconds at 30fps as fallback
              fps: 30,
              width: 1920,
              height: 1080,
            };
          }
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
