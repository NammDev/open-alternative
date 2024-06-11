"use server";

import { Prisma } from "@prisma/client";
import { db } from "../db";
import { LATEST_TOOLS_TRESHOLD } from "../constants";
import slugify from "slugify";
import { CreateToolSchema, CreateToolSchemaType } from "../schemas/tool";
import { getRepoOwnerAndName } from "../utils";
import { graphql } from "@octokit/graphql";
import {
  calculateHealthScore,
  repositoryQuery,
  RepositoryQueryResult,
} from "../utils/github";
import { getOg } from "../utils/og";
import { MetaTags } from "@/types";

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

export async function createTool(form: CreateToolSchemaType) {
  const validatedFields = CreateToolSchema.safeParse(form);
  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, website, repository, content } = validatedFields.data;
  const ogData = await getOg(website);
  const tool = await db.tool.create({
    data: {
      name,
      website,
      repository,
      content,
      slug: slugify(name),
      screenshotUrl: ogData?.image,
    },
  });

  await updateGithubForTool(repository, tool.id);
}

export async function updateGithubForTool(repositoryUrl: string, id: string) {
  const repo = getRepoOwnerAndName(repositoryUrl);
  const owner = repo?.owner;
  const name = repo?.name;

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
