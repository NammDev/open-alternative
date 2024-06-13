import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(20),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
