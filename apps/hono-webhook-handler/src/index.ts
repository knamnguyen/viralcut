import { UserJSON, WebhookEvent } from "@clerk/backend";
import { trpcServer } from "@hono/trpc-server";
import { Context, Hono, Next } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { Webhook } from "svix";

import type { AppRouter } from "@sassy/api";
import { appRouter, createServerClient, createTRPCContext } from "@sassy/api";

import type { Env } from "./env";
import { getEnv } from "./env";

// Define a type for our caller based on the user router operations we need
type CallerType = {
  user: {
    create: (input: {
      id: string;
      firstName?: string;
      lastName?: string;
      primaryEmailAddress?: string;
      imageUrl?: string;
      clerkUserProperties?: any;
    }) => Promise<any>;
    update: (input: {
      id: string;
      data: {
        firstName?: string;
        lastName?: string;
        primaryEmailAddress?: string;
        imageUrl?: string;
        clerkUserProperties?: any;
      };
    }) => Promise<any>;
    delete: (input: { id: string }) => Promise<any>;
  };
};

// Initialize Hono app with typed environment and variables
const app = new Hono<{
  Bindings: Env;
  Variables: {
    webhookEvent: WebhookEvent;
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

// Health check endpoint
app.get("/", (c) => c.text("Webhook handler is running"));
app.get("/health", (c) => c.json({ status: "ok" }));

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

    const webhookSecret = getEnv(c.env, "CLERK_WEBHOOK_SECRET");

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
    // Create a server client with the validated environment and explicit type assertion
    const caller = (await createServerClient()) as unknown as CallerType;

    switch (eventType) {
      case "user.created": {
        try {
          const user = data as UserJSON;
          const primaryEmail = user.email_addresses?.find(
            (email) => email.id === user.primary_email_address_id,
          )?.email_address;

          // Call create mutation
          await caller.user.create({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            primaryEmailAddress: primaryEmail,
            imageUrl: user.image_url,
            clerkUserProperties: user,
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

          // Call update mutation
          await caller.user.update({
            id: user.id,
            data: {
              firstName: user.first_name,
              lastName: user.last_name,
              primaryEmailAddress: primaryEmail,
              imageUrl: user.image_url,
              clerkUserProperties: user,
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
          // Call delete mutation
          await caller.user.delete({
            id: user.id,
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

// Mount the tRPC router
app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: async ({ req }) => {
      // Create tRPC context from Hono request
      return createTRPCContext({
        headers: new Headers(req.headers),
      });
    },
  }),
);

// Export for Cloudflare Workers
export default app;
