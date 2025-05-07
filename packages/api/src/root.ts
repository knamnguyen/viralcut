import { founderlogRouter } from "./router/founderlog";
import { postRouter } from "./router/post";
import { stripeRouter } from "./router/stripe";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  stripe: stripeRouter,
  founderlog: founderlogRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
