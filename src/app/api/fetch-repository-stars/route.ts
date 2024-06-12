import { z } from "zod";
import { graphql } from "@octokit/graphql";
import {
  repositoryStarsQuery,
  RepositoryStarsQueryResult,
} from "@/lib/utils/github";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams);

  const schema = z.object({
    owner: z.string(),
    name: z.string(),
  });

  const { owner, name } = schema.parse(searchParams);

  try {
    const { repository } = await graphql<RepositoryStarsQueryResult>({
      query: repositoryStarsQuery,
      owner,
      name,
      headers: { authorization: `token ${process.env.GITHUB_TOKEN}` },
    });

    return new Response(repository.stargazerCount.toString(), {
      status: 200,
    });
  } catch (error) {
    console.error(`Failed to fetch repository stars ${owner}/${name}`, error);
    throw new Error(`Failed to fetch repository stars ${owner}/${name}`);
  }
}
