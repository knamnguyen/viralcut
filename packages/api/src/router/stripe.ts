// packages/api/src/router/stripe.ts
import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// import type { Prisma } from "@sassy/db";
import { StripePaymentSchema } from "@sassy/db/schema-validators";
import { StripeService } from "@sassy/stripe";

import { protectedProcedure } from "../trpc";

/**
 * Create a Stripe service instance
 * This is used by all the tRPC procedures
 */
const stripeService = new StripeService({
  secretKey: process.env.STRIPE_SECRET_KEY ?? "",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? "",
});

//TODO: check if this is the case
export const stripeRouter = {
  /**
   * Create a checkout session for subscription or one-time payment
   *
   * @param priceId - Stripe price ID
   * @param mode - "subscription" for recurring, "payment" for one-time
   * @returns URL to redirect to Stripe checkout
   */

  createCheckout: protectedProcedure
    .input(
      z.object({
        priceId: z.string(), // Stripe price ID
        mode: z.enum(["subscription", "payment"]).default("subscription"),
        metadata: z.record(z.string()).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get authenticated user from context
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const userId = ctx.user.id;

      // Get user email
      const email = ctx.user.emailAddresses[0]?.emailAddress;

      if (!email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User email is required",
        });
      }

      // Get origin for redirect URLs
      const origin = process.env.NEXTJS_URL ?? "http://localhost:3000";

      // Create checkout session with Stripe
      return stripeService.createCheckoutSession(
        userId, // Clerk user ID
        email,
        {
          priceId: input.priceId,
          mode: input.mode,
          successUrl: `${origin}/?payment=success`,
          cancelUrl: `${origin}/?payment=canceled`,
          metadata: input.metadata,
        },
      );
    }),

  /**
   * Create a customer portal session for subscription management
   *
   * @returns URL to redirect to Stripe customer portal
   */
  createCustomerPortal: protectedProcedure
    .input(
      z.object({
        returnUrl: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // Get authenticated user from context
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const userId = ctx.user.id;

      // Get origin for redirect URL if not provided
      const origin = process.env.NEXTJS_URL ?? "http://localhost:3000";
      const returnUrl = input.returnUrl ?? `${origin}/subscription`;

      // Create customer portal session with Stripe
      const result = await stripeService.createCustomerPortalSession(
        userId, // Clerk user ID
        returnUrl,
      );

      if (!result.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create customer portal session",
        });
      }

      return result;
    }),

  /**
   * Check if user has access (subscription or lifetime)
   * This queries Stripe directly rather than a local database
   *
   * @returns Access status information
   */
  checkAccess: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      return { hasAccess: false, accessType: "none" };
    }

    const access = await stripeService.checkAccess(ctx.user.id);
    return access;
  }),

  recordPayment: protectedProcedure
    .input(StripePaymentSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not authenticated",
        });
      }

      const dataToInsert = {
        clerkUserId: ctx.user.id,
        amount: input.amount,
        currency: input.currency,
        status: input.status,
        stripePaymentId: input.stripePaymentId,
        metadata: input.metadata,
      };

      // Store the payment in the database
      // This is not happening by the way
      const result = await ctx.db.stripePayment.create({
        data: dataToInsert,
      });
      return result;
    }),
} satisfies TRPCRouterRecord;

//prevent type leakage issues across your entire Turborepo while maintaining proper type checking during development
