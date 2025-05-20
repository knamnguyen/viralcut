import type { TRPCRouterRecord } from "@trpc/server";
import { clerkClient } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";

import { db } from "@sassy/db";
import {
  createEntryInputSchema,
  getPublicTimelineInputSchema,
  upvoteEntryInputSchema,
} from "@sassy/validators";

import { protectedProcedure, publicProcedure } from "../trpc";

// Simple keyword list for MVP auto-tagging (case-insensitive)
// Can be expanded and moved to a config/constant file later
const KEYWORDS_TO_TAGS: Record<string, string> = {
  code: "coding",
  build: "coding",
  develop: "coding",
  feature: "coding",
  bugfix: "coding",
  fix: "coding",
  deploy: "ops",
  release: "ops",
  test: "testing",
  prototype: "design",
  design: "design",
  ui: "design",
  ux: "design",
  market: "marketing",
  marketing: "marketing",
  sell: "sales",
  sales: "sales",
  close: "sales",
  outreach: "sales",
  "cold call": "sales",
  email: "communication",
  content: "writing",
  write: "writing",
  blog: "writing",
  seo: "marketing",
  ads: "marketing",
  ppc: "marketing",
  launch: "product",
  pitch: "fundraising",
  deck: "fundraising",
  demo: "sales",
  hire: "hiring",
  interview: "hiring",
  meeting: "meetings",
  call: "meetings",
  plan: "planning",
  planning: "planning",
  strategy: "planning",
  finance: "finance",
  budget: "finance",
  fundraising: "fundraising",
  legal: "legal",
  contract: "legal",
  support: "support",
  customer: "support",
  learn: "learning",
  read: "learning",
  course: "learning",
  research: "research",
  analyze: "research",
  network: "networking",
  connect: "networking",
  feedback: "product",
  investor: "fundraising",
};

const findTagsForContent = (content: string): string[] => {
  const lowerContent = content.toLowerCase();
  const foundTags = new Set<string>();
  for (const keyword in KEYWORDS_TO_TAGS) {
    if (lowerContent.includes(keyword)) {
      foundTags.add(KEYWORDS_TO_TAGS[keyword]!);
    }
  }
  return Array.from(foundTags);
};

export const founderlogRouter = {
  // Create new log entry(s)
  createEntry: protectedProcedure
    .input(createEntryInputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const userId = ctx.user.id;
      const entriesContent: string[] = input.content
        .split("\n")
        .filter((line: string) => line.trim() !== "");

      if (entriesContent.length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Entry content cannot be empty after trimming.",
        });
      }

      return db.$transaction(
        async (prisma) => {
          await prisma.user.upsert({
            where: { id: userId },
            update: {},
            create: { id: userId },
          });

          const createdEntries = [];

          for (const content of entriesContent) {
            const tagsToLink = findTagsForContent(content);

            console.log("tagsToLink: ", tagsToLink);
            let tagIdsToConnect: { id: string }[] = [];

            if (tagsToLink.length > 0) {
              const existingTags = await prisma.founderLogTag.findMany({
                where: { name: { in: tagsToLink } },
                select: { id: true, name: true },
              });
              const existingTagNames = new Set(existingTags.map((t) => t.name));
              tagIdsToConnect = existingTags.map((t) => ({ id: t.id }));

              const tagsToCreate = tagsToLink.filter(
                (t) => !existingTagNames.has(t),
              );
              if (tagsToCreate.length > 0) {
                await prisma.founderLogTag.createMany({
                  data: tagsToCreate.map((name) => ({ name })),
                  skipDuplicates: true,
                });
                const allTags = await prisma.founderLogTag.findMany({
                  where: { name: { in: tagsToLink } },
                  select: { id: true },
                });
                tagIdsToConnect = allTags.map((t) => ({ id: t.id }));
              }
            }
            console.log("tagIdsToConnect: ", tagIdsToConnect);

            const newEntry = await prisma.founderLogEntry.create({
              data: {
                userId,
                content,
                tags: {
                  create: tagIdsToConnect.map((tag) => ({
                    tag: { connect: { id: tag.id } },
                  })),
                },
              },
              include: { tags: { include: { tag: true } } },
            });
            console.log("newEntry: ", newEntry);
            createdEntries.push(newEntry);
          }
          return createdEntries;
        },
        {
          timeout: 15000, // Increase timeout to 15 seconds
        },
      );
    }),

  // Get data for the user's dashboard
  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const userId = ctx.user.id;
    const entries = await db.founderLogEntry.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        tags: { include: { tag: true } },
      },
    });
    const reflections = await db.founderLogReflection.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    return { entries, reflections };
  }),

  // Get data for a public timeline
  getPublicTimeline: publicProcedure
    .input(getPublicTimelineInputSchema)
    .query(async ({ input }) => {
      let userId: string | undefined = undefined;
      try {
        const client = await clerkClient();
        const users = await client.users.getUserList({
          username: [input.username],
          limit: 1,
        });
        if (users.data.length > 0 && users.data[0]) {
          userId = users.data[0].id;
        } else {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: `User with username '${input.username}' not found.`,
          });
        }
      } catch (error) {
        console.error("Clerk API error fetching user by username:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user information.",
        });
      }

      const entries = await db.founderLogEntry.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        include: {
          tags: { include: { tag: true } },
        },
      });

      return { username: input.username, entries };
    }),

  // Upvote an entry
  upvoteEntry: publicProcedure
    .input(upvoteEntryInputSchema)
    .mutation(async ({ input }) => {
      try {
        const updatedEntry = await db.founderLogEntry.update({
          where: { id: input.entryId },
          data: {
            upvoteCount: { increment: 1 },
          },
          select: { id: true, upvoteCount: true },
        });
        return updatedEntry;
      } catch (error) {
        if (error) {
          if (error === "P2025") {
            throw new TRPCError({
              code: "NOT_FOUND",
              message: `Entry with ID '${input.entryId}' not found.`,
            });
          }
        }
        console.error("Error upvoting entry:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upvote entry.",
        });
      }
    }),

  // Get all public entries for the public wall
  getAllPublicEntries: publicProcedure.query(async () => {
    try {
      const entries = await db.founderLogEntry.findMany({
        orderBy: { createdAt: "desc" },
        take: 50, // Limit to most recent 50 entries
        include: {
          tags: { include: { tag: true } },
        },
      });

      // For each entry, try to get the username
      const entriesWithUsernames = await Promise.all(
        entries.map(async (entry) => {
          const client = await clerkClient();
          const user = await client.users.getUser(entry.userId);

          return {
            ...entry,
            user: {
              username: user.username ?? "Unknown User",
            },
          };
        }),
      );

      return entriesWithUsernames;
    } catch (error) {
      console.error("Failed to fetch public entries:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch public entries.",
      });
    }
  }),
} satisfies TRPCRouterRecord;
