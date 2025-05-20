import { z } from "zod";

import type { Prisma } from "../generated/client";

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(256),
  content: z.string().min(1),
});

// Explicitly use string-only metadata to avoid portability issues with Prisma's JSON type
export const StripePaymentSchema = z.object({
  amount: z.number(),
  currency: z.string().default("usd"),
  status: z.string(),
  stripePaymentId: z.string(),
  metadata: z.custom<Prisma.StripePaymentCreateInput["metadata"]>().optional(),
  clerkUserId: z.string(),
});

// User schemas for Clerk integration
export const userCreateSchema = z.object({
  id: z.string(), // This is the Clerk ID
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  primaryEmailAddress: z.string().email().optional(),
  imageUrl: z.string().url().optional(),
  clerkUserProperties: z.record(z.string(), z.any()).optional(),
});

export const userUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  primaryEmailAddress: z.string().email().optional(),
  imageUrl: z.string().url().optional(),
  clerkUserProperties: z.record(z.string(), z.any()).optional(),
});
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
export type StripePaymentInput = z.infer<typeof StripePaymentSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
