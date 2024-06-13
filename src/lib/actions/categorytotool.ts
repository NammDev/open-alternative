"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const categoryManyPayload = Prisma.validator<Prisma.CategoryInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export const getCategoriesTool = async (slug: string) => {
  return await db.categoryToTools.findMany({
    where: { tool: { slug } },
    orderBy: { category: { name: "asc" } },
    include: { category: { include: categoryManyPayload } },
  });
};

export const getToolsRelated = async (slug: string) => {
  return await db.categoryToTools.findMany({
    where: {
      category: { tools: { some: { tool: { slug } } } },
      NOT: { tool: { slug } },
    },
    include: { tool: true },
    distinct: ["toolId"],
    orderBy: { tool: { score: "desc" } },
  });
};
