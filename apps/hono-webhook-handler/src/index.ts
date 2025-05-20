import { UserJSON, WebhookEvent } from "@clerk/backend";
import { Context, Hono, Next } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Webhook } from "svix";

import { prisma as prismaMiddleware } from "./middleware/db";

// Initialize Hono app with typed environment and variables
const app = new Hono<{
  Variables: {
    webhookEvent: WebhookEvent;
    prisma: any; // The Prisma client set by middleware
  };
}>();

// Add logger middleware
app.use("*", logger());

// Add CORS middleware
app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

// Add Prisma middleware to all API routes
app.use("/api/*", prismaMiddleware());

// Health check endpoint
app.get("/", (c) => c.text("Webhook handler is running"));
app.get("/health", (c) => c.json({ status: "ok" }));

//get users from prisma all for testing
app.get("/api/users", async (c) => {
  const prisma = c.get("prisma");
  const users = await prisma.user.findMany();

  return c.json(users);
});

// Webhook verification middleware
const verifyClerkWebhook = async (c: Context, next: Next) => {
  try {
    const payload = await c.req.json();
    const headers = Object.fromEntries(c.req.raw.headers.entries());
    const svixId = headers["svix-id"] as string;
    const svixTimestamp = headers["svix-timestamp"] as string;
    const svixSignature = headers["svix-signature"] as string;

    if (!svixId || !svixTimestamp || !svixSignature) {
      return c.json({ error: "Missing Svix headers" }, 400);
    }

    const webhookSecret = c.env.CLERK_WEBHOOK_SECRET as string;

    // Verify the webhook with Svix
    const wh = new Webhook(webhookSecret);
    const evt = wh.verify(JSON.stringify(payload), {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    });
    c.set("webhookEvent", evt);
    await next();
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return c.json({ error: "Webhook verification failed" }, 400);
  }
};

// Clerk webhook handler
app.post("/api/webhooks/clerk", verifyClerkWebhook, async (c) => {
  const evt = c.get("webhookEvent") as WebhookEvent;
  const eventType = evt.type;
  const data = evt.data;

  console.log(`Webhook event received: ${eventType}`);

  try {
    // Get Prisma client from context (set by middleware)
    const db = c.get("prisma");

    switch (eventType) {
      case "user.created": {
        try {
          const user = data as UserJSON;
          const primaryEmail = user.email_addresses?.find(
            (email) => email.id === user.primary_email_address_id,
          )?.email_address;

          // Create user directly with Prisma
          await db.user.create({
            data: {
              id: user.id,
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username ?? user.first_name ?? user.last_name,
              primaryEmailAddress: primaryEmail,
              imageUrl: user.image_url,
              clerkUserProperties: user as any,
            },
          });
          console.log(`User created: ${user.id}`);
        } catch (error) {
          console.error("Error creating user:", error);
          return c.json({ error: "Failed to create user" }, 500);
        }
        break;
      }

      case "user.updated": {
        try {
          const user = data as UserJSON;
          const primaryEmail = user.email_addresses?.find(
            (email) => email.id === user.primary_email_address_id,
          )?.email_address;

          // Update user directly with Prisma
          await db.user.update({
            where: { id: user.id },
            data: {
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username ?? user.first_name ?? user.last_name,
              primaryEmailAddress: primaryEmail,
              imageUrl: user.image_url,
              clerkUserProperties: user as any,
            },
          });
          console.log(`User updated: ${user.id}`);
        } catch (error) {
          console.error("Error updating user:", error);
          return c.json({ error: "Failed to update user" }, 500);
        }
        break;
      }

      case "user.deleted": {
        try {
          const user = data as UserJSON;

          // Delete user directly with Prisma
          await db.user.delete({
            where: { id: user.id },
          });
          console.log(`User deleted: ${user.id}`);
        } catch (error) {
          console.error("Error deleting user:", error);
          return c.json({ error: "Failed to delete user" }, 500);
        }
        break;
      }

      default:
        console.log(`Unhandled webhook event type: ${eventType}`);
    }

    return c.json({ success: true });
  } catch (error) {
    console.error(`Error processing webhook event ${eventType}:`, error);
    return c.json({ error: "Failed to process webhook" }, 500);
  }
});

// Export for Cloudflare Workers
export default app;
