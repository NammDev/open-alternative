import { z } from "zod";

export const CreateToolSchema = z.object({
  name: z.string().min(1),
  website: z.string().url().min(1),
  repository: z
    .string()
    .url()
    .refine(
      (url) => /^https:\/\/github\.com\/([^/]+)\/([^/]+)(\/)?$/.test(url),
      "The repository must be a valid GitHub URL with owner and repo name.",
    ),
  content: z.string().min(1).max(200),
  youtube: z.string().optional(),
});

export type CreateToolSchemaType = z.infer<typeof CreateToolSchema>;
