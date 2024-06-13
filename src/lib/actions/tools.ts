"use server";

import {
  EditContentSchema,
  EditContentSchemaType,
  EditDescriptionSchema,
  EditDescriptionSchemaType,
} from "./../schemas/tool";
import { Prisma } from "@prisma/client";
import { db } from "../db";
import { LATEST_TOOLS_TRESHOLD } from "../constants";
import slugify from "slugify";
import {
  EditToolSchema,
  CreateToolSchema,
  CreateToolSchemaType,
  EditToolSchemaType,
  EditToolTechnologySchemaType,
  EditToolTechnologySchema,
} from "../schemas/tool";
import { getRepoOwnerAndName } from "../utils";
import { graphql } from "@octokit/graphql";
import {
  calculateHealthScore,
  repositoryQuery,
  RepositoryQueryResult,
} from "../utils/github";
import { getOg } from "../utils/og";

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
    take: 3,
  });
};

export const getTools = async () => {
  return await db.tool
    .findMany({
      where: { publishedAt: { lte: new Date() } },
      include: {
        technologies: {
          orderBy: { technology: { name: "asc" } },
          include: { technology: { select: { name: true } } },
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
        technologies: tool.technologies.map(
          ({ technology }) => technology.name,
        ),
        categories: tool.categories.map(({ category }) => category.name),
        languages: tool.languages.map(({ language }) => language.name),
        topics: tool.topics.map(({ topic }) => topic.slug),
      })),
    );
};

export async function createTool(form: CreateToolSchemaType) {
  const validatedFields = CreateToolSchema.safeParse(form);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, website, repository, content, youtube } = validatedFields.data;
  const ogData = await getOg(website);
  const tool = await db.tool.create({
    data: {
      name,
      website,
      repository,
      content,
      youtube: youtube || null,
      slug: slugify(name),
      screenshotUrl: ogData?.image,
    },
  });

  const repo = getRepoOwnerAndName(repository);

  await updateGithubForTool(repo?.owner, repo?.name, tool.id);
  await updateLocsForTool(repo?.owner, repo?.name, tool.id);
}

export async function updateGithubForTool(
  owner: string | undefined,
  name: string | undefined,
  id: string,
) {
  try {
    const { repository } = (await graphql({
      query: repositoryQuery,
      owner,
      name,
      headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
    }).catch(async (error) => {
      // if the repository check fails, set the tool as draft
      await db.tool.update({
        where: { id },
        data: { publishedAt: null },
      });
      console.log("Failed at fetching repository", error);
    })) as RepositoryQueryResult;

    // Extract and transform the necessary metrics
    const metrics = {
      stars: repository.stargazerCount,
      forks: repository.forkCount,
      contributors: repository.mentionableUsers.totalCount,
      watchers: repository.watchers.totalCount,
      lastCommitDate: new Date(
        repository.defaultBranchRef.target.history.edges[0].node.committedDate,
      ),
      // bump,
    };

    const score = calculateHealthScore(metrics);
    const stars = metrics.stars;
    const forks = metrics.forks;
    const license =
      repository.licenseInfo.spdxId === "NOASSERTION"
        ? null
        : repository.licenseInfo.spdxId;
    const lastCommitDate = metrics.lastCommitDate;

    // Prepare topics data
    const topics = repository.repositoryTopics.nodes.map(({ topic }) => ({
      slug: slugify(topic.name),
    }));

    // Prepare languages data
    const languages = repository.languages.edges
      .map(({ size, node }) => ({
        percentage: Math.round((size / repository.languages.totalSize) * 100),
        name: node.name,
        slug: slugify(node.name),
        color: node.color,
      }))
      .filter(({ percentage }) => percentage > 17.5);

    // Update the tool
    return await db.tool.update({
      where: { id },
      data: {
        stars,
        forks,
        license,
        lastCommitDate,
        score,
        publishedAt: new Date(),
        description: repository.description,
        faviconUrl:
          repository.owner?.avatarUrl ||
          `https://www.google.com/s2/favicons?sz=64&domain_url=github.com`,

        // Topics
        topics: {
          connectOrCreate: topics.map(({ slug }) => ({
            where: {
              toolId_topicSlug: {
                toolId: id,
                topicSlug: slug,
              },
            },
            create: {
              topic: {
                connectOrCreate: {
                  where: { slug },
                  create: { slug },
                },
              },
            },
          })),
        },

        // Languages
        languages: {
          connectOrCreate: languages.map(
            ({ percentage, name, slug, color }) => ({
              where: {
                toolId_languageSlug: {
                  toolId: id,
                  languageSlug: slug,
                },
              },
              create: {
                percentage,
                language: {
                  connectOrCreate: {
                    where: { slug },
                    create: { name, slug, color },
                  },
                },
              },
            }),
          ),
        },
      },
    });
  } catch (error) {
    console.error(`Failed to update repository ${owner}/${name}`, error);
  }
}

export async function updateLocsForTool(
  owner: string | undefined,
  name: string | undefined,
  id: string,
) {
  try {
    // lines of codes
    const response = await fetch(
      `https://api.codetabs.com/v1/loc?github=${owner}/${name}`,
      { method: "GET" },
    );
    const dataCodeTabs = await response.json();
    const total = dataCodeTabs.find((item: any) => item.language === "Total");

    // Update the tool
    return await db.tool.update({
      where: { id },
      data: {
        linesOfCode: total.linesOfCode || 0,
        files: total.files || 0,
      },
    });
  } catch (error) {
    console.error(`Failed LOCs`, error);
  }
}

export async function editTool(form: EditToolSchemaType, slug: string) {
  const tool = await db.tool.findUnique({
    where: { slug },
  });
  if (!tool) throw new Error(`Tool with slug ${slug} not found`);

  const parsedBody = EditToolSchema.safeParse(form);
  if (!parsedBody.success) throw new Error("bad request");

  const categories = parsedBody.data.categories?.map((id) => ({ id })) ?? [];

  const existCategories = await db.category.findMany({
    where: {
      id: {
        in: categories.map(({ id }) => id),
      },
    },
  });

  return await db.tool.update({
    where: { slug },
    data: {
      categories: {
        deleteMany: {},
        connectOrCreate: existCategories.map(({ id, name, slug }) => ({
          where: { toolId_categoryId: { toolId: tool.id, categoryId: id } },
          create: {
            category: {
              connectOrCreate: {
                where: { slug },
                create: { name, slug },
              },
            },
          },
        })),
      },
    },
  });
}

export async function editToolTech(
  form: EditToolTechnologySchemaType,
  slug: string,
) {
  const tool = await db.tool.findUnique({
    where: { slug },
  });
  if (!tool) throw new Error(`Tool with slug ${slug} not found`);

  const parsedBody = EditToolTechnologySchema.safeParse(form);
  if (!parsedBody.success) throw new Error("bad request");

  const technologies =
    parsedBody.data.technologies?.map((id) => ({ id })) ?? [];

  const existTechnologies = await db.technology.findMany({
    where: {
      id: {
        in: technologies.map(({ id }) => id),
      },
    },
  });

  return await db.tool.update({
    where: { slug },
    data: {
      technologies: {
        deleteMany: {},
        connectOrCreate: existTechnologies.map(
          ({ id, name, slug, website, description, faviconUrl }) => ({
            where: {
              toolId_technologyId: { toolId: tool.id, technologyId: id },
            },
            create: {
              technology: {
                connectOrCreate: {
                  where: { slug },
                  create: { name, slug, website, description, faviconUrl },
                },
              },
            },
          }),
        ),
      },
    },
  });
}

export async function editToolContent(
  form: EditContentSchemaType,
  slug: string,
) {
  const tool = await db.tool.findUnique({
    where: { slug },
  });
  if (!tool) throw new Error(`Tool with slug ${slug} not found`);

  const parsedBody = EditContentSchema.safeParse(form);
  if (!parsedBody.success) throw new Error("bad request");

  const content = parsedBody.data.content ?? [];

  return await db.tool.update({
    where: { slug },
    data: {
      content,
    },
  });
}

export async function editToolDescription(
  form: EditDescriptionSchemaType,
  slug: string,
) {
  const tool = await db.tool.findUnique({
    where: { slug },
  });
  if (!tool) throw new Error(`Tool with slug ${slug} not found`);

  const parsedBody = EditDescriptionSchema.safeParse(form);
  if (!parsedBody.success) throw new Error("bad request");

  const description = parsedBody.data.description ?? [];

  return await db.tool.update({
    where: { slug },
    data: {
      description,
    },
  });
}
