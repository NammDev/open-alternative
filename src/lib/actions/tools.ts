"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { LATEST_TOOLS_TRESHOLD } from "../constants";
import slugify from "slugify";
import { CreateToolSchema, CreateToolSchemaType } from "../schemas/tool";

const toolOnePayload = Prisma.validator<Prisma.ToolInclude>()({});
const toolManyPayload = Prisma.validator<Prisma.ToolInclude>()({});

export const getTool = async (slug: string) => {
  return await db.tool.findFirst({
    where: { slug },
    include: toolOnePayload,
  });
};

export const getToolsLatest = async () => {
  return await db.tool.findMany({
    where: { publishedAt: { gte: LATEST_TOOLS_TRESHOLD, lte: new Date() } },
    orderBy: { publishedAt: "desc" },
    include: toolManyPayload,
  });
};

export const getTools = async () => {
  return await db.tool
    .findMany({
      where: { publishedAt: { lte: new Date() } },
      include: {
        alternatives: {
          orderBy: { alternative: { name: "asc" } },
          include: { alternative: { select: { name: true } } },
        },
        categories: {
          orderBy: { category: { name: "asc" } },
          include: { category: { select: { name: true } } },
        },
        languages: {
          orderBy: { percentage: "desc" },
          include: { language: { select: { name: true } } },
        },
        topics: {
          orderBy: { topic: { slug: "asc" } },
          include: { topic: { select: { slug: true } } },
        },
      },
    })
    .then((tools) =>
      tools.map((tool) => ({
        ...tool,
        alternatives: tool.alternatives.map(
          ({ alternative }) => alternative.name,
        ),
        categories: tool.categories.map(({ category }) => category.name),
        languages: tool.languages.map(({ language }) => language.name),
        topics: tool.topics.map(({ topic }) => topic.slug),
      })),
    );
};

export default async function createTool(form: CreateToolSchemaType) {
  const validatedFields = CreateToolSchema.safeParse(form);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, website, repository, description } = validatedFields.data;
  // const tool = await db.tool.create({
  //   data: {
  //     name,
  //     website,
  //     repository,
  //     description,
  //     slug: slugify(name),
  //   },
  // });
  console.log(name);
}
