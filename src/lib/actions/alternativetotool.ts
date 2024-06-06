"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const alternativeManyPayload = Prisma.validator<Prisma.AlternativeInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export type AlternativeMany = Prisma.AlternativeGetPayload<{
  include: typeof alternativeManyPayload;
}>;

export const getAlternatives = async (slug: string) => {
  return await db.alternativeToTool.findMany({
    where: { tool: { slug } },
    orderBy: { alternative: { name: "asc" } },
    include: { alternative: { include: alternativeManyPayload } },
  });
};
