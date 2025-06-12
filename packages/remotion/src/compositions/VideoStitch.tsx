import { AbsoluteFill, Sequence, OffthreadVideo, useVideoConfig  } from 'remotion';
import { secondsToFrames } from '../utils/time-parsing';
import { VideoStitchClip } from '../schema-validators'; 
import { parseTimeRange } from '../utils/time-parsing';

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
    <AbsoluteFill className="bg-black flex items-center justify-center">
      {clips.map((clip, index) => {
        const { startSeconds, endSeconds } = parseTimeRange(clip.range);
        const startFrame = secondsToFrames(startSeconds, fps);
        const endFrame = secondsToFrames(endSeconds, fps);
        const clipDurationInFrames = endFrame - startFrame;

        const sequenceProps = {
          from: currentFrame,
          durationInFrames: clipDurationInFrames,
        };
        currentFrame += clipDurationInFrames;

        return (
          <Sequence key={index} {...sequenceProps}>
            <AbsoluteFill>
              {/* Video is always fit inside container with aspect ratio 6:19 (object-contain) */}
              <OffthreadVideo
                src={videoUrl}
                startFrom={startFrame}
                endAt={endFrame}
                // Tailwind classes for sizing and object-fit
                className="w-full h-full object-contain"
                volume={1}
                delayRenderTimeoutInMilliseconds={300000}
                delayRenderRetries={3}
              />

              {/* Caption Overlay */}
              {clip.caption && (
                <div
                  // Absolute positioning at 80% from top and horizontal center
                  className="
                    absolute
                    left-1/2
                    top-[80%]
                    -translate-x-1/2
                    -translate-y-1/2
                    flex
                    justify-center
                    w-full
                  "
                >
                  <div
                    className="
                      bg-black/80
                      text-white
                      px-6
                      py-4
                      rounded-lg
                      font-semibold
                      text-center
                      max-w-[80%]
                      shadow-lg
                      border
                      border-white/10
                      text-[max(1.5rem,min(2.5vw,3rem))]
                    "
                    style={{
                      fontFamily: 'SF Pro Display, system-ui, sans-serif',
                    }}
                  >
                    {clip.caption}
                  </div>
                </div>
              )}
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};