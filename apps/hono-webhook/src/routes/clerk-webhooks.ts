import { DeletedObjectJSON, UserJSON, WebhookEvent } from "@clerk/backend";
import { Context, Hono, Next } from "hono";
import { Webhook } from "svix";

import type { User } from "@sassy/db/schema-validators";

import type { AppType } from "../types";

// Initialize Hono app for clerk webhook routes
export const clerkWebhooksRouter = new Hono<AppType>();

// Webhook verification middleware
const verifyClerkWebhook = async (c: Context, next: Next) => {
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
  const event = wh.verify(JSON.stringify(payload), {
    "svix-id": svixId,
    "svix-timestamp": svixTimestamp,
    "svix-signature": svixSignature,
  }) as WebhookEvent;
  c.set("webhookEvent", event);
  await next();
};

// Clerk webhook handler
clerkWebhooksRouter.post("/clerk", verifyClerkWebhook, async (c) => {
  const event = c.get("webhookEvent");

  console.log(`Webhook event received: ${event.type}`);

  // Get Prisma client from context (set by middleware)
  const db = c.get("prisma");
  console.log("db", db);

  switch (event.type) {
    case "user.created": {
      const user = event.data as UserJSON;

      const primaryEmail = user.email_addresses?.find(
        (email) => email.id === user.primary_email_address_id,
      )?.email_address;

      const userJson = JSON.parse(JSON.stringify(user));
      // console.log("userJson", userJson);

      //logging all data input from db.user.create
      console.log("user id", user.id);
      console.log("user first name", user.first_name);
      console.log("user last name", user.last_name);
      console.log("user username", user.username);
      console.log("user primary email", primaryEmail);
      console.log("user image url", user.image_url);
      // console.log("user clerk user properties", userJson);

      // Create user directly with Prisma
      const userDb = await db.user.create({
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username ?? user.first_name ?? user.last_name,
          primaryEmailAddress: primaryEmail,
          imageUrl: user.image_url,
          clerkUserProperties: userJson,
        },
      });
      console.log(`User created: ${user.id}`);
      break;
    }

    case "user.updated": {
      const user = event.data as UserJSON;
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
      break;
    }

    case "user.deleted": {
      const user = event.data as DeletedObjectJSON;

      // Delete user directly with Prisma
      await db.user.delete({
        where: { id: user.id },
      });
      console.log(`User deleted: ${user.id}`);
      break;
    }

    default:
      console.log(`Unhandled webhook event type: ${event.type}`);
      break;
  }

  return c.json({ success: true });
});
