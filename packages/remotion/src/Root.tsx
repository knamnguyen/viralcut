import React from "react";
import { Composition, registerRoot } from "remotion";

import { HelloWorld } from "./compositions/HelloWorld";

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
    </>
  );
};

registerRoot(RemotionRoot);
