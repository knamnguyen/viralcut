import { createTRPCRouter } from "../trpc";
import { founderlogRouter } from "./founderlog";
import { postRouter } from "./post";
import { stripeRouter } from "./stripe";

export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
  founderlog: founderlogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
