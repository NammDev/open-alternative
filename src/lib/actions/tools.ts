"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";

const toolOnePayload = Prisma.validator<Prisma.ToolInclude>()({});

export const getTool = async (slug: string) => {
  return await db.tool.findFirst({
    where: { slug },
    include: toolOnePayload,
  });
};
