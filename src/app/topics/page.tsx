import { Grid } from "@/components/app-ui/Grid";
import { getTopics, getTopicsCount } from "@/lib/actions/topics";
import { Intro } from "@/components/app-ui/Intro";
import { SearchParams } from "@/types";
import { TopicRecord } from "@/components/app-ui/TopicRecord";
import { PaginationTopic } from "./Pagination";
import { TOPICS_PER_PAGE } from "@/lib/constants";

const meta = {
  title: "Open Source Software Topics",
  description:
    "Browse top topics to find your best Open Source software options.",
};

export default async function TopicsIndex({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = searchParams;
  const [topics, topicCount] = await Promise.all([
    getTopics(page),
    getTopicsCount(),
  ]);

  return (
    <>
      <Intro {...meta} />

      <Grid className="md:gap-8">
        {topics.map((topic) => (
          <TopicRecord key={topic.slug} topic={topic} />
        ))}

        {!topics.length && <p className="col-span-full">No topics found.</p>}
      </Grid>

      {/* <PaginationTopic totalCount={topicCount} pageSize={TOPICS_PER_PAGE} /> */}
    </>
  );
}
