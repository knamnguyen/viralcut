import { Hono } from "hono";

import { AppType } from "../types";

// Initialize Hono app for users routes
export const userRouter = new Hono<AppType>();

// Get all users endpoint
userRouter.get("/users", async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany();

  return c.json(users);
});
