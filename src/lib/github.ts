import "server-only";

import { unstable_cache as cache } from "next/cache";

export async function getGithubStars() {
  return await cache(
    async () => {
      const response = await fetch(
        "https://api.github.com/repos/sadmann7/skateshop",
        {
          headers: {
            Accept: "application/vnd.github+json",
          },
          next: {
            revalidate: 60,
          },
        },
      );

      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as { stargazers_count: number };

      return data.stargazers_count;
    },
    ["github-stars"],
    {
      revalidate: 900,
      tags: ["github-stars"],
    },
  )();
}

import { DAY_IN_MS } from "./constants";

export type RepositoryQueryResult = {
  repository: {
    stargazerCount: number;
    forkCount: number;
    watchers: {
      totalCount: number;
    };
    mentionableUsers: {
      totalCount: number;
    };
    licenseInfo: {
      spdxId: string;
    };
    defaultBranchRef: {
      target: {
        history: {
          edges: Array<{
            node: {
              committedDate: string;
            };
          }>;
        };
      };
    };
    repositoryTopics: {
      nodes: {
        topic: {
          name: string;
        };
      }[];
    };
    languages: {
      totalSize: number;
      edges: Array<{
        size: number;
        node: {
          name: string;
          color: string;
        };
      }>;
    };
  };
};

export type RepositoryStarsQueryResult = {
  repository: {
    stargazerCount: number;
  };
};

export const repositoryQuery = `query RepositoryQuery($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    stargazerCount
    forkCount
    watchers {
      totalCount
    }
    mentionableUsers {
      totalCount
    }
    licenseInfo {
      spdxId
    }
    defaultBranchRef {
      target {
        ... on Commit {
          history(first: 1) {
            edges {
              node {
                ... on Commit {
                  committedDate
                }
              }
            }
          }
        }
      }
    }
    repositoryTopics(first: 25) {
      nodes {
        topic {
          name
        }
      }
    }
    languages(first: 3, orderBy: { field: SIZE, direction: DESC}) {
      totalSize
      edges {
        size
        node {
          name
          color
        }
      }
    }
  }
}`;

export const repositoryStarsQuery = `query RepositoryQuery($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    stargazerCount
  }
}`;
