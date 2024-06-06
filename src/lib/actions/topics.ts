"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const topicOnePayload = Prisma.validator<Prisma.TopicInclude>()({
  tools: {
    where: { tool: { publishedAt: { lte: new Date() } } },
    include: { tool: true },
    orderBy: [{ tool: { isFeatured: "desc" } }, { tool: { score: "desc" } }],
  },
});

const topicManyPayload = Prisma.validator<Prisma.TopicInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export type TopicOne = Prisma.TopicGetPayload<{
  include: typeof topicOnePayload;
}>;
export type TopicMany = Prisma.TopicGetPayload<{
  include: typeof topicManyPayload;
}>;

export const getTopics = async (take: number, skip: number) => {
  return db.language.findMany({
    orderBy: { slug: "asc" },
    include: topicManyPayload,
    take,
    skip,
  });
};

export const getTopicsBySlug = async (slug: string) => {
  return db.language.findUniqueOrThrow({
    where: { slug },
    include: topicOnePayload,
  });
};
