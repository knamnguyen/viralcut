import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

interface HelloWorldProps {
  text?: string;
}

export const HelloWorld = ({
  text = "Hello World!",
}: HelloWorldProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Spring animation for smooth entrance
  const springValue = spring({
    frame,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  // Fade in effect
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale animation
  const scale = interpolate(springValue, [0, 1], [0.8, 1]);

  return (
    <AbsoluteFill
      className="bg-[#000212] flex justify-center items-center font-['SF_Pro_Display,system-ui,sans-serif']"
    >
      <div
        className="text-white text-[100px] font-bold text-center"
        style={{
          transform: `scale(${scale})`,
          opacity,
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
