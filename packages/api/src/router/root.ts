import { createTRPCRouter } from "../trpc";
import { postRouter } from "./post";
import { remotionRouter } from "./remotion";
import { remotionHelloRouter } from "./remotion-hello";
import { remotionDemoStitchRouter } from "./remotion-demo-stitch";
import { stripeRouter } from "./stripe";
import { videoRouter } from "./video";

export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
  remotionHello: remotionHelloRouter,
  remotion: remotionRouter,
  remotionDemoStitch: remotionDemoStitchRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
