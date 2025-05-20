import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  userCreateSchema,
  userUpdateSchema,
} from "@sassy/db/schema-validators";

import { protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = {
  /**
   * Create a new user in the database
   * This is primarily used by the webhook handler
   */
  create: publicProcedure
    .input(userCreateSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.user.create({
          data: {
            id: input.id,
            firstName: input.firstName,
            lastName: input.lastName,
            primaryEmailAddress: input.primaryEmailAddress,
            imageUrl: input.imageUrl,
            clerkUserProperties: input.clerkUserProperties,
          },
        });
      } catch (error) {
        console.error("Error creating user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create user",
          cause: error,
        });
      }
    }),

  /**
   * Update an existing user in the database
   * This is primarily used by the webhook handler
   */
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: userUpdateSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.user.update({
          where: { id: input.id },
          data: input.data,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update user",
          cause: error,
        });
      }
    }),

  /**
   * Delete a user from the database
   * This is primarily used by the webhook handler
   */
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.db.user.delete({
          where: { id: input.id },
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete user",
          cause: error,
        });
      }
    }),

  /**
   * Get the current authenticated user
   * This is primarily used by client applications
   */
  me: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }

    // const prismaType = ctx.Prisma;

    try {
      const user = await ctx.db.user.findUnique({
        where: { id: ctx.user.id },
      });

      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch user",
        cause: error,
      });
    }
  }),

  /**
   * Get a user by ID
   * This is primarily used by client applications
   */
  // byId: publicProcedure
  //   .input(z.object({ id: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     try {
  //       return await ctx.db.user.findUnique({
  //         where: { id: input.id },
  //       });
  //     } catch (error) {
  //       console.error("Error fetching user by ID:", error);
  //       throw new TRPCError({
  //         code: "INTERNAL_SERVER_ERROR",
  //         message: "Failed to fetch user by ID",
  //         cause: error,
  //       });
  //     }
  //   }),
} satisfies TRPCRouterRecord;
