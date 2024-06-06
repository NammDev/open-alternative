"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const languageManyPayload = Prisma.validator<Prisma.LanguageInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export const getLanguages = async (slug: string) => {
  return await db.languageToTool.findMany({
    where: { tool: { slug } },
    orderBy: { language: { name: "asc" } },
    include: { language: { include: languageManyPayload } },
  });
};
