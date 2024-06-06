"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

// Alternatives
export const alternativeOnePayload =
  Prisma.validator<Prisma.AlternativeInclude>()({
    tools: {
      where: { tool: { publishedAt: { lte: new Date() } } },
      include: { tool: true },
      orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
    },
  });

export const alternativeManyPayload =
  Prisma.validator<Prisma.AlternativeInclude>()({
    _count: {
      select: {
        tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
      },
    },
  });

export type AlternativeOne = Prisma.AlternativeGetPayload<{
  include: typeof alternativeOnePayload;
}>;
export type AlternativeMany = Prisma.AlternativeGetPayload<{
  include: typeof alternativeManyPayload;
}>;

export const getAlternatives = async () => {
  return db.alternative.findMany({
    orderBy: { name: "asc" },
    include: alternativeManyPayload,
  });
};

export const getAlternativesBySlug = async (slug: string) => {
  return db.alternative.findUniqueOrThrow({
    where: { slug },
    include: alternativeOnePayload,
  });
};
