import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z.string().min(1).max(256),
  content: z.string().min(1),
});

export type CreatePostInput = z.infer<typeof CreatePostSchema>;
