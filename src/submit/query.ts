export type RepositoryQueryResultLicense = {
  repository: {
    stargazerCount: number;
    forkCount: number;
    watchers: {
      totalCount: number;
    };
    mentionableUsers: {
      totalCount: number;
    };
    description: string;
    owner: {
      avatarUrl: string;
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

export const repositoryQueryLicense = `query RepositoryQuery($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      stargazerCount
      forkCount
      watchers {
        totalCount
      }
      owner {
        avatarUrl
      }
      description
      mentionableUsers {
        totalCount
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
