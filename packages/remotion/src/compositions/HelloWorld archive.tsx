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
      style={{
        backgroundColor: "#000212",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "SF Pro Display, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          color: "#ffffff",
          fontSize: 100,
          fontWeight: "bold",
          transform: `scale(${scale})`,
          opacity,
          textAlign: "center",
          textShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
