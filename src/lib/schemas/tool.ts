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

export const EditToolSchema = z.object({
  categories: z.array(z.string()).optional(),
});

export type EditToolSchemaType = z.infer<typeof EditToolSchema>;

export const EditToolTechnologySchema = z.object({
  technologies: z.array(z.string()).optional(),
});

export type EditToolTechnologySchemaType = z.infer<
  typeof EditToolTechnologySchema
>;

export const EditContentSchema = z.object({
  content: z.string().min(1).max(500),
});

export type EditContentSchemaType = z.infer<typeof EditContentSchema>;

export const EditDescriptionSchema = z.object({
  description: z.string().min(1).max(200),
});

export type EditDescriptionSchemaType = z.infer<typeof EditDescriptionSchema>;
