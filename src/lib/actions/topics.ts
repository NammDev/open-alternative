"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { TOPICS_PER_PAGE } from "../constants";
import { getCurrentPage } from "../utils";

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

export const getTopics = async (page: string | undefined) => {
  const currentPage = getCurrentPage(page);
  const skip = (currentPage - 1) * TOPICS_PER_PAGE;
  return await db.topic.findMany({
    orderBy: { slug: "asc" },
    include: topicManyPayload,
    take: TOPICS_PER_PAGE,
    skip,
  });
};

export const getTopicsBySlug = async (slug: string) => {
  return await db.topic.findUniqueOrThrow({
    where: { slug },
    include: topicOnePayload,
  });
};

export const getTopicsCount = async () => {
  return await db.topic.count();
};
