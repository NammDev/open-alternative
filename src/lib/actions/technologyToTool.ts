"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const technologyManyPayload = Prisma.validator<Prisma.TechnologyInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export type TechnologyMany = Prisma.TechnologyGetPayload<{
  include: typeof technologyManyPayload;
}>;

export const getTechnologys = async (slug: string) => {
  return await db.technologyToTool.findMany({
    where: { tool: { slug } },
    orderBy: { technology: { name: "asc" } },
    include: { technology: { include: technologyManyPayload } },
  });
};
