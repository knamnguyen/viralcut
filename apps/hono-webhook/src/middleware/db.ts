import type { MiddlewareHandler } from "hono";
import { PrismaPg } from "@prisma/adapter-pg";
import { createMiddleware } from "hono/factory";

import { PrismaClientEdge } from "@sassy/db";

// Create a middleware that initializes Prisma on demand
export const prismaMiddleware = (): MiddlewareHandler => {
  return createMiddleware(async (c, next) => {
    if (!c.get("prisma")) {
      const env = c.env;
      try {
        const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
        // Create Prisma client with adapter
        // @ts-expect-error - PrismaClientEdge expects adapter but TypeScript doesn't recognize it
        const prisma = new PrismaClientEdge({ adapter });
        // Store in context for later use
        c.set("prisma", prisma);
      } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error("Error initializing Prisma:", err);
        throw err;
      }
    }

    await next();
  });
};
