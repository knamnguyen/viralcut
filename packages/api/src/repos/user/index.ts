import { TRPCError } from "@trpc/server";
import { format } from "date-fns/format";

import type { TRPCContext, TRPCContextWithoutAuth } from "@geekgrind/api/trpc";
import type { paymentValidators, userValidators } from "@geekgrind/validators";
import {
    FREE_TIER_SUBSCRIPTION_DAILY_AI_ASK_LIMIT,
    FREE_TIER_SUBSCRIPTION_DAILY_QUESTION_LIMIT,
} from "@geekgrind/api/constants";
import { createStripeCustomer } from "@geekgrind/payment";
import { questionValidators } from "@geekgrind/validators";

import { BaseRepo } from "../base";

export class UserRepo extends BaseRepo {
    findUserById = (ctx: TRPCContext, id: string) => {
        return ctx.prisma.user.findFirst({
            where: { id },
            select: {
                id: true,
                email: true,
                emailVerified: true,
                firstName: true,
                lastName: true,
                name: true,
                nickname: true,
                avatar: true,
                discordId: true,
                googleId: true,
                role: true,
                createdAt: true,
                stripeCustomerId: true,
            },
        });
    };

    updateLastLogin = (ctx: TRPCContextWithoutAuth, userId: string) => {
        return ctx.prisma.userStatistics.update({
            where: { userId },
            data: {
                lastLoginAt: new Date(),
            },
        });
    };

    getMonthlyActivity = async (
        ctx: TRPCContext,
        input: userValidators.GetUserMonthlyActivitySchema,
    ) => {
        const monthStart = new Date(input.year, input.month, 1);
        const monthEnd = new Date(input.year, input.month + 1, 0);
        return ctx.prisma.userDailyQuestionsCompleted.findMany({
            where: {
                userId: ctx.user.id,
                date: {
                    gte: monthStart,
                    lte: monthEnd,
                },
            },
            orderBy: {
                date: "asc",
            },
            select: {
                date: true,
                questionsCorrectCount: true,
                uniqueQuestionsAttemptedCount: true,
            },
        });
    };

    updateMyDailyStreak = async (ctx: TRPCContext) => {
        return ctx.prisma.userStatistics.update({
            where: {
                userId: ctx.user.id,
                OR: [
                    { lastStreakDate: { gt: new Date() } },
                    { lastStreakDate: null },
                ],
            },
            data: {
                dailyStreakCount: 0,
            },
        });
    };

    getUserSubscription = (ctx: TRPCContext) => {
        return ctx.prisma.userSubscription.findFirst({
            where: { userId: ctx.user.id },
        });
    };

    getDailyActivity = async (
        ctx: TRPCContext,
        input: userValidators.GetUserDailyActivitySchema,
    ) => {
        const date = new Date(input.year, input.month, input.day);
        if (isNaN(date.getTime()))
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Invalid date",
            });

        return ctx.prisma.userDailyQuestionsCompleted.findFirst({
            where: {
                userId: ctx.user.id,
                date: new Date(),
            },
            orderBy: {
                date: "desc",
            },
        });
    };

    getUserStatistics = (ctx: TRPCContext) => {
        return ctx.prisma.userStatistics.findFirst({
            where: { userId: ctx.user.id },
        });
    };

    createUserStatistics = async (ctx: TRPCContext) => {
        try {
            return await ctx.prisma.userStatistics.create({
                data: {
                    userId: ctx.user.id,
                },
            });
        } catch (error) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to create user statistics",
            });
        }
    };

    initializeUser = async (
        ctx: TRPCContextWithoutAuth,
        input:
            | userValidators.UpdateSSOUserSchema
            | { hashedPassword: string; email: string },
    ) => {
        return ctx.prisma.$transaction(async (tx) => {
            // Create user with placeholder stripeCustomerId
            const user = await tx.user.create({
                data: {
                    ...input,
                    stripeCustomerId: "placeholder",
                },
                select: {
                    id: true,
                    avatar: true,
                    email: true,
                },
            });

            // Create Stripe customer
            const stripeCustomer = await createStripeCustomer(
                user.id,
                input.email,
            );

            // Create user statistics and update stripe ID
            await Promise.all([
                tx.userStatistics.create({
                    data: {
                        userId: user.id,
                    },
                }),
                tx.user.update({
                    where: { id: user.id },
                    data: { stripeCustomerId: stripeCustomer.id },
                }),
            ]);

            return { ...user, stripeCustomerId: stripeCustomer.id };
        });
    };

    upsertSSOUser = async (
        ctx: TRPCContextWithoutAuth,
        input: userValidators.UpdateSSOUserSchema,
    ) => {
        const updatedUser = await ctx.prisma.$transaction(async (tx) => {
            const { email, ...updateFields } = input;
            const googleUser = await tx.user.findFirst({
                where: { email },
            });

            if (!googleUser) {
                // We need to recreate context with tx inside it for the transaction
                const txCtx = {
                    ...ctx,
                    prisma: tx,
                };
                return this.initializeUser(txCtx as TRPCContextWithoutAuth, {
                    ...updateFields,
                    email,
                });
            }

            return tx.user.update({
                where: { email },
                data: updateFields,
            });
        });

        if (!updatedUser) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Failed to upsert sso user",
            });
        }
        return updatedUser;
    };

    updateUser = (
        ctx: TRPCContextWithoutAuth,
        input: userValidators.UpdateUserSchema,
    ) => {
        return ctx.prisma.$transaction(async (tx) => {
            const { id, ...updateFields } = input;
            const existingUser = await tx.user.findFirst({
                where: { id },
            });

            if (!existingUser)
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "User not found",
                });

            const updatedUser = await tx.user.update({
                where: { id },
                data: updateFields,
            });

            if (!updatedUser)
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to update user",
                });

            return updatedUser;
        });
    };

    checkUserLimitAllowances = (ctx: TRPCContext) => {
        // this function creates a daily allowance for the user if it does not exist, you could use it to check the daily limit for the user or create the daily limit record
        const txFn = async (prisma: typeof ctx.prisma) => {
            const [_questionsCompleted, userSubscription] = await Promise.all([
                prisma.userDailyQuestionsCompleted.findFirst({
                    where: {
                        userId: ctx.user.id,
                        date: new Date(),
                    },
                }),
                prisma.userSubscription.findFirst({
                    where: { userId: ctx.user.id },
                    include: { subscriptionPlan: true },
                }),
            ]);

            let questionsCompleted = _questionsCompleted;

            if (!questionsCompleted) {
                questionsCompleted =
                    await prisma.userDailyQuestionsCompleted.create({
                        data: {
                            userId: ctx.user.id,
                            date: format(new Date(), "yyyy-MM-dd"),
                        },
                    });
            }

            const dailyQuestionLimit =
                userSubscription?.subscriptionPlan.dailyQuestionLimit ??
                FREE_TIER_SUBSCRIPTION_DAILY_QUESTION_LIMIT;

            const dailyAskAILimit =
                userSubscription?.subscriptionPlan.dailyAskAiLimit ??
                FREE_TIER_SUBSCRIPTION_DAILY_AI_ASK_LIMIT;

            return {
                question:
                    dailyQuestionLimit -
                    questionsCompleted.uniqueQuestionsAttemptedCount,
                askAI: dailyAskAILimit - questionsCompleted.askAiUsed,
            };
        };

        // Check if transaction is available
        return typeof ctx.prisma.$transaction === "function"
            ? ctx.prisma.$transaction(txFn as any)
            : txFn(ctx.prisma);
    };

    initializeDailyAllowance = (ctx: TRPCContext) => {
        return ctx.prisma.userDailyQuestionsCompleted.upsert({
            where: {
                userId_date: {
                    userId: ctx.user.id,
                    date: new Date(),
                },
            },
            update: {},
            create: {
                userId: ctx.user.id,
                date: new Date(),
            },
        });
    };

    // TODO: require testing
    consumeAskAIAllowance = (ctx: TRPCContext) => {
        const txFn = async (prisma: typeof ctx.prisma) => {
            // Create a context with transaction for checking allowances
            const txCtx = { ...ctx, prisma } as TRPCContext;
            const allowance = await this.checkUserLimitAllowances(txCtx);

            if (allowance.askAI <= 0)
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: "Daily AI ask limit exceeded",
                });

            const newLimit = await prisma.userDailyQuestionsCompleted.upsert({
                where: {
                    userId_date: {
                        userId: ctx.user.id,
                        date: new Date(),
                    },
                },
                update: {
                    askAiUsed: {
                        increment: 1,
                    },
                },
                create: {
                    userId: ctx.user.id,
                    date: new Date(),
                    askAiUsed: 1,
                },
                select: {
                    askAiUsed: true,
                },
            });

            // Removed unnecessary conditional since upsert will always return a value
            return allowance.askAI - newLimit.askAiUsed;
        };

        // Check if transaction is available
        return typeof ctx.prisma.$transaction === "function"
            ? ctx.prisma.$transaction(txFn as any)
            : txFn(ctx.prisma);
    };

    // TODO: require testing
    consumeQuestionAllowance = (ctx: TRPCContext, questionId: string) => {
        const txFn = async (prisma: typeof ctx.prisma) => {
            // Create a context with transaction for checking allowances
            const txCtx = { ...ctx, prisma } as TRPCContext;
            const allowance = await this.checkUserLimitAllowances(txCtx);

            if (allowance.question <= 0)
                throw new TRPCError({
                    code: "TOO_MANY_REQUESTS",
                    message: "Daily question limit exceeded",
                });

            const viewedBefore = await prisma.questionViewed.findFirst({
                where: {
                    userId: ctx.user.id,
                    questionId: questionId,
                },
            });

            if (viewedBefore) {
                return allowance.question;
            }

            await prisma.questionViewed.create({
                data: {
                    userId: ctx.user.id,
                    questionId,
                },
            });

            const newLimit = await prisma.userDailyQuestionsCompleted.upsert({
                where: {
                    userId_date: {
                        userId: ctx.user.id,
                        date: new Date(),
                    },
                },
                update: {
                    uniqueQuestionsAttemptedCount: {
                        increment: 1,
                    },
                },
                create: {
                    userId: ctx.user.id,
                    date: new Date(),
                    uniqueQuestionsAttemptedCount: 1,
                },
                select: {
                    uniqueQuestionsAttemptedCount: true,
                },
            });

            // Removed unnecessary conditional since upsert will always return a value
            return allowance.question - newLimit.uniqueQuestionsAttemptedCount;
        };

        // Check if transaction is available
        return typeof ctx.prisma.$transaction === "function"
            ? ctx.prisma.$transaction(txFn as any)
            : txFn(ctx.prisma);
    };

    createCheckoutSession = async (
        ctx: TRPCContext,
        input: Omit<paymentValidators.CreateCheckoutSessionSchema, "userId">,
    ) => {
        // this function utilizes the existing payment createcheckoutsession function and creates a checkout session for the the current user
        return this.rootRepo.payment.createCheckoutSession(ctx, {
            ...input,
            userId: ctx.user.id,
        });
    };

    cancelCurrentUserSubscription = async (ctx: TRPCContext) => {
        const currentUserSubscription = await this.getUserSubscription(ctx);
        if (!currentUserSubscription)
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User subscription not found",
            });

        await this.rootRepo.payment.cancelSubscription(
            ctx,
            currentUserSubscription.id,
        );
    };

    getTopicsProgressOverview = async (ctx: TRPCContext, subjectId: string) => {
        const topics = await ctx.prisma.topic.findMany({
            where: { subjectId },
        });

        const questionCounts = await ctx.prisma.questionAttempt.findMany({
            where: {
                userId: ctx.user.id,
                isCorrect: true,
                subjectId,
            },
        });

        const topicsMap = topics.reduce(
            (acc, curr) => {
                acc[curr.id] = {
                    ...curr,
                    questionsCompleted: 0,
                };
                return acc;
            },
            {} as Record<
                string,
                (typeof topics)[0] & { questionsCompleted: number }
            >,
        );

        for (const qc of questionCounts) {
            if (!topicsMap[qc.topicId]) {
                console.warn("Subject not found for question", qc);
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topicsMap[qc.topicId]!.questionsCompleted++;
        }

        return Object.values(topicsMap);
    };

    getSubjectsProgressOverview = async (
        ctx: TRPCContext,
        syllabusId: string,
    ) => {
        const subjects = await ctx.prisma.subject.findMany({
            where: { syllabusId },
        });

        const questionCounts = await ctx.prisma.questionAttempt.findMany({
            where: {
                userId: ctx.user.id,
                isCorrect: true,
                syllabusId,
            },
        });

        const subjectMap = subjects.reduce(
            (acc, curr) => {
                acc[curr.id] = {
                    ...curr,
                    questionsCompleted: 0,
                };
                return acc;
            },
            {} as Record<
                string,
                (typeof subjects)[0] & { questionsCompleted: number }
            >,
        );

        for (const qc of questionCounts) {
            if (!subjectMap[qc.subjectId]) {
                console.warn("Subject not found for question", qc);
                continue;
            }
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            subjectMap[qc.subjectId]!.questionsCompleted++;
        }

        return Object.values(subjectMap);
    };

    buildQuestionAttemptTypeQuery = (
        selectedType: questionValidators.FindMyQuestionHistoryFilterType,
    ) => {
        switch (selectedType) {
            case questionValidators.FindMyQuestionHistoryFilterType.ALL:
                return undefined;
            case questionValidators.FindMyQuestionHistoryFilterType.UNSOLVED:
                return { isCorrect: false };
            case questionValidators.FindMyQuestionHistoryFilterType.SOLVED:
                return { isCorrect: true };
            default:
                throw new Error(
                    "Unhandled filter type at questionAttemptFilterTypeMap",
                );
        }
    };

    findMyQuestionHistory = async (
        ctx: TRPCContext,
        input: questionValidators.FindMyQuestionHistorySchema,
    ) => {
        // Construct where conditions
        const whereConditions: Record<string, unknown> = {
            userId: ctx.user.id,
        };

        // Add filter by question attempt type
        const typeFilter = this.buildQuestionAttemptTypeQuery(input.type);
        if (typeFilter) {
            whereConditions.isCorrect = typeFilter.isCorrect;
        }

        // Add cursor-based pagination
        const paginationOptions = {
            take: input.limit + 1,
            ...(input.cursor
                ? {
                      cursor: { id: input.cursor },
                      skip: 1, // Skip the cursor item
                  }
                : {}),
        };

        // Add additional filters
        if (input.subjectIds?.length) {
            if (!whereConditions.question) {
                whereConditions.question = {};
            }
            (whereConditions.question as Record<string, unknown>).subjectId = {
                in: input.subjectIds,
            };
        }

        if (input.topicIds?.length) {
            if (!whereConditions.question) {
                whereConditions.question = {};
            }
            (whereConditions.question as Record<string, unknown>).topicId = {
                in: input.topicIds,
            };
        }

        // Perform the query
        const questionAttempts = await ctx.prisma.questionAttempt.findMany({
            where: whereConditions,
            include: {
                question: {
                    include: {
                        topic: true,
                        subject: true,
                    },
                },
            },
            orderBy: { id: "desc" },
            ...paginationOptions,
        });

        // Handle pagination results
        const hasNextPage = questionAttempts.length > input.limit;
        const items = hasNextPage
            ? questionAttempts.slice(0, input.limit)
            : questionAttempts;

        return {
            data: items,
            cursor: items.length > 0 ? items[items.length - 1]?.id : null,
            limit: input.limit,
            hasNextPage,
        };
    };
}
