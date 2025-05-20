import type { MiddlewareHandler } from "hono";
import { PrismaPg } from "@prisma/adapter-pg";
import { createMiddleware } from "hono/factory";

import { PrismaClientEdge } from "@sassy/db";

// Create a middleware that initializes Prisma on demand
export const prisma = (): MiddlewareHandler => {
  return createMiddleware(async (c, next) => {
    if (!c.get("prisma")) {
      const env = c.env;
      try {
        const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });
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
