"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

// Languages
const languageOnePayload = Prisma.validator<Prisma.LanguageInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
});

const languageManyPayload = Prisma.validator<Prisma.LanguageInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export type LanguageOne = Prisma.LanguageGetPayload<{
  include: typeof languageOnePayload;
}>;
export type LanguageMany = Prisma.LanguageGetPayload<{
  include: typeof languageManyPayload;
}>;

export const getLanguages = async () => {
  return db.language.findMany({
    orderBy: { name: "asc" },
    include: languageManyPayload,
  });
};

export const getLanguagesBySlug = async (slug: string) => {
  return db.language.findUniqueOrThrow({
    where: { slug },
    include: languageOnePayload,
  });
};
