"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const technologyOnePayload = Prisma.validator<Prisma.TechnologyInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
});

const technologyManyPayload = Prisma.validator<Prisma.TechnologyInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export type TechnologyOne = Prisma.TechnologyGetPayload<{
  include: typeof technologyOnePayload;
}>;
export type TechnologyMany = Prisma.TechnologyGetPayload<{
  include: typeof technologyManyPayload;
}>;

export const getTechnologies = async () => {
  return db.technology.findMany({
    orderBy: { name: "asc" },
    include: technologyManyPayload,
  });
};

export const getTechnologysBySlug = async (slug: string) => {
  return db.technology.findUniqueOrThrow({
    where: { slug },
    include: technologyOnePayload,
  });
};
