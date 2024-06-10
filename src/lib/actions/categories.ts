"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
} from "@/lib/schemas/category";

const categoryManyPayload = Prisma.validator<Prisma.CategoryInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

const categoryOnePayload = Prisma.validator<Prisma.CategoryInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
});

export type CategoryMany = Prisma.CategoryGetPayload<{
  include: typeof categoryManyPayload;
}>;

export const getCategories = async () => {
  return db.category.findMany({
    orderBy: { name: "asc" },
    include: categoryManyPayload,
  });
};

export const getCategoriesBySlug = async (slug: string) => {
  return db.category.findUniqueOrThrow({
    where: { slug },
    include: categoryOnePayload,
  });
};

export async function createCategory(form: CreateCategorySchemaType) {
  const parsedBody = CreateCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const { name } = parsedBody.data;
  return await db.category.create({
    data: {
      name,
      slug: name.toLowerCase().replace(/\s/g, "-"),
    },
  });
}
