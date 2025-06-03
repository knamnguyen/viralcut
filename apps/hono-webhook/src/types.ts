import { WebhookEvent as ClerkWebhookEvent } from "@clerk/backend";
import Stripe from "stripe";

import { PrismaClientEdge } from "@sassy/db";

/**
 * Type definition for the Hono app and its context variables
 */
export type AppType = {
  Variables: {
    webhookEvent: ClerkWebhookEvent | Stripe.Event;
    prisma: PrismaClientEdge;
    stripe: Stripe;
  };
};
