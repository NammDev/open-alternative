"use server";

import { db } from "@/lib/db";
import { getRepoOwnerAndName } from "@/lib/utils";
import {
  calculateHealthScore,
  repositoryQuery,
  RepositoryQueryResult,
} from "@/lib/utils/github";
import { getOg } from "@/lib/utils/og";
import { graphql } from "@octokit/graphql";
import slugify from "slugify";
import { repositoryQueryLicense, RepositoryQueryResultLicense } from "./query";

export async function createTool(repository: {
  website: string;
  github: string;
  youtube: string | undefined;
}) {
  const { website, github, youtube } = repository;
  const repo = getRepoOwnerAndName(github);
  const name = repo?.name as string;

  const ogData = await getOg(website);
  try {
    const tool = await db.tool.create({
      data: {
        name,
        website,
        repository: github,
        content: "Content",
        youtube: youtube || null,
        slug: slugify(name),
        screenshotUrl: ogData?.image,
      },
    });
  } catch (error) {
    console.log(`Error in create tool ${name}`);
  }
}

export async function updateToolLicense(repository: {
  website: string;
  github: string;
  youtube: string | undefined;
}) {
  const repo = getRepoOwnerAndName(repository.github);
  const name = repo?.name as string;

  const tool = await db.tool.findFirst({
    where: { name },
  });

  if (tool) {
    if (tool.description === null && tool.stars === 0) {
      await updateGithubForTool(repo?.owner, repo?.name, tool.id);
      console.log(`Updated tool license ${name}`);
    } else {
      console.log(`Tool already updated ${name}`);
    }
  } else {
    console.log("No tool");
  }
}

export async function updateToolNoLicense(repository: {
  website: string;
  github: string;
  youtube: string | undefined;
}) {
  const repo = getRepoOwnerAndName(repository.github);
  const name = repo?.name as string;

  const tool = await db.tool.findFirst({
    where: { name },
  });

  if (tool) {
    if (tool.description === null && tool.stars === 0) {
      await updateGithubForToolNoLicense(repo?.owner, repo?.name, tool.id);
      console.log(`Updated tool license ${name}`);
    } else {
      console.log(`Tool already updated ${name}`);
    }
  } else {
    console.log("No tool");
  }
}

export async function updateLOC(repository: {
  website: string;
  github: string;
  youtube: string | undefined;
}) {
  const repo = getRepoOwnerAndName(repository.github);
  const name = repo?.name as string;

  const tool = await db.tool.findFirst({
    where: { name },
  });

  if (tool) {
    if (tool.linesOfCode === 0) {
      await updateLocsForTool(repo?.owner, repo?.name, tool.id);
      console.log(`Updated tool ${name}`);
    } else {
      console.log(`Tool already updated ${name}`);
    }
  } else {
    console.log("No tool");
  }
}

// ------------------------------

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

export async function updateGithubForToolNoLicense(
  owner: string | undefined,
  name: string | undefined,
  id: string,
) {
  try {
    const { repository } = (await graphql({
      query: repositoryQueryLicense,
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
    })) as RepositoryQueryResultLicense;

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
    const license = null;
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
