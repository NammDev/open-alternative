"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const topicManyPayload = Prisma.validator<Prisma.TopicInclude>()({
  _count: {
    select: {
      tools: { where: { tool: { publishedAt: { lte: new Date() } } } },
    },
  },
});

export const getTopics = async (slug: string) => {
  return await db.topicToTool.findMany({
    where: { tool: { slug } },
    orderBy: { topic: { slug: "asc" } },
    include: { topic: { include: topicManyPayload } },
  });
};
