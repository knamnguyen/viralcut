import { createTRPCRouter } from "../trpc";
import { postRouter } from "./post";
import { remotionRouter } from "./remotion";
import { stripeRouter } from "./stripe";
import { videoRouter } from "./video";

export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
  remotion: remotionRouter,
  video: videoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
