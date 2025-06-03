import { Context, Hono, Next } from "hono";
import Stripe from "stripe";

import { AccessTypeType } from "@sassy/db/schema-validators";

import type { AppType } from "../types";

// Initialize Hono app for stripe webhook routes
export const stripeWebhooksRouter = new Hono<AppType>();

// Stripe webhook verification middleware
const verifyStripeWebhook = async (c: Context, next: Next) => {
  const signature = c.req.header("stripe-signature");

  if (!signature) {
    return c.json({ error: "Missing Stripe signature header" }, 400);
  }

  const webhookSecret = c.env.STRIPE_WEBHOOK_SECRET as string;
  const secretKey = c.env.STRIPE_SECRET_KEY as string;

  // Create Stripe instance with Cloudflare Workers compatibility
  const stripe = new Stripe(secretKey, {
    apiVersion: "2023-08-16",
  });

  // Verify the webhook using Stripe's async method for Workers
  let event: Stripe.Event;

  try {
    // Get request body as text - the Workers-compatible way
    const body = await c.req.text();
    // Use the async version which works with Cloudflare Workers' SubtleCrypto
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      webhookSecret,
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return c.json({ error: "Invalid webhook signature" }, 400);
  }

  // Store event in context for the handler
  c.set("webhookEvent", event);
  c.set("stripe", stripe);
  console.log("webhook event successfully verified");
  await next();
};

// Determine access type based on subscription status and interval OR session mode
// Convert to values that match your database schema's enum
const getAccessTypeFromStripeEvent = (
  event: Stripe.Checkout.Session | Stripe.Subscription,
): AccessTypeType => {
  if (event.object === "checkout.session") {
    const session = event as Stripe.Checkout.Session;
    const purchaseType = session.metadata?.purchaseType as AccessTypeType;
    return purchaseType;
  }
  if (event.object === "subscription") {
    const subscription = event as Stripe.Subscription;
    return subscription.items.data[0]?.plan?.interval === "year"
      ? "YEARLY"
      : "MONTHLY";
  }
  return "FREE";
};

// Stripe webhook handler for subscription events
stripeWebhooksRouter.post(
  "/stripe",
  verifyStripeWebhook,
  async (c: Context) => {
    const stripe = c.get("stripe");

    const event = c.get("webhookEvent") as Stripe.Event;
    console.log(`Stripe webhook event received: ${event.type}`);

    // Get Prisma client from context
    const db = c.get("prisma");
    //use this only for updating the json properties of the user since it doesn't have accessType
    if (event.type.startsWith("customer.subscription")) {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;
      const customer = (await stripe.customers.retrieve(
        customerId,
      )) as Stripe.Customer;
      const clerkUserId = customer.metadata.clerkUserId as string;
      const accessType = getAccessTypeFromStripeEvent(subscription);

      console.log("customerId in subscription webhook: ", customerId);
      console.log("clerkId in subscription webhook: ", clerkUserId);

      switch (event.type) {
        // Handle subscription events
        case "customer.subscription.created": {
          //new customer so no stripeCustomerId yet in the userDb
          //so we need to find the user by the clerkId stored in metadata
          const user = await db.user.update({
            where: { id: clerkUserId },
            data: {
              stripeCustomerId: customerId,
              accessType: accessType,
            },
          });
          console.log(
            `User subscription created, access type: ${accessType} for user: ${clerkUserId}`,
          );
          break;
        }

        case "customer.subscription.updated": {
          await db.user.update({
            where: { id: clerkUserId },
            data: {
              stripeCustomerId: customerId,
              accessType: accessType,
            },
          });

          console.log(`User subscription updated access type: ${accessType}`);
          break;
        }

        case "customer.subscription.deleted": {
          await db.user.update({
            where: { id: clerkUserId },
            data: {
              accessType: "FREE",
              stripeCustomerId: null,
            },
          });

          console.log(
            `User subscription deleted, access revoked for user: ${clerkUserId}`,
          );
          break;
        }
      }
    } else if (event.type.startsWith("checkout.session")) {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = session.customer as string;
      const clerkUserId = session.metadata?.clerkUserId as string;
      const accessType = getAccessTypeFromStripeEvent(session);

      switch (event.type) {
        case "checkout.session.completed": {
          await db.user.update({
            where: { id: clerkUserId },
            data: {
              accessType: accessType,
              stripeCustomerId: customerId,
            },
          });
          console.log(
            `User checkout session completed, access type: ${accessType} for user: ${clerkUserId}`,
          );
          break;
        }
      }
    } else {
      console.log("unhandled event type: ", event.type);
    }

    return c.json({ success: true });
  },
);
