import { z } from "zod";

export const createEntryInputSchema = z.object({
  content: z.string().min(1, { message: "Entry content cannot be empty." }),
});
export type CreateEntryInput = z.infer<typeof createEntryInputSchema>;

export const addReflectionInputSchema = z.object({
  type: z.enum(["morning", "evening"], {
    errorMap: () => ({
      message: "Reflection type must be 'morning' or 'evening'.",
    }),
  }),
  content: z
    .string()
    .min(1, { message: "Reflection content cannot be empty." }),
});
export type AddReflectionInput = z.infer<typeof addReflectionInputSchema>;

export const upvoteEntryInputSchema = z.object({
  entryId: z.string().cuid({ message: "Invalid entry ID format." }),
});
export type UpvoteEntryInput = z.infer<typeof upvoteEntryInputSchema>;

export const getPublicTimelineInputSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty." }),
});
export type GetPublicTimelineInput = z.infer<
  typeof getPublicTimelineInputSchema
>;
