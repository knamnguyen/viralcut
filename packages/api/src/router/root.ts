import { createTRPCRouter } from "../trpc";
import { postRouter } from "./post";
import { remotionRouter } from "./remotion";
import { stripeRouter } from "./stripe";

export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
  remotion: remotionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
