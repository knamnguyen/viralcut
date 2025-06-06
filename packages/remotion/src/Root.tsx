import React from "react";
import { Composition, registerRoot } from "remotion";

import { HelloWorld } from "./compositions/HelloWorld";
import { VideoSpeedAdjust } from "./compositions/VideoSpeedAdjust";

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
        durationInFrames={300} // Default fallback, will be overridden by calculateMetadata
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          videoUrl: "https://example.com/video.mp4",
          speedMultiplier: 0.5,
          durationInFrames: 300,
        }}
        calculateMetadata={({ props }) => {
          // Use the durationInFrames from props if provided, otherwise use default
          const duration = props.durationInFrames || 300;
          return {
            durationInFrames: duration,
            fps: 30,
            width: 1920,
            height: 1080,
          };
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
