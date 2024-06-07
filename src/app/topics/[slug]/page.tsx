import { BackButton } from "@/components/app-ui/BackButton";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getTopicsBySlug } from "@/lib/actions/topics";

type CategoriesPageProps = {
  params: { slug: string };
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const topic = await getTopicsBySlug(params.slug);
  const meta = {
    title: `Best Open Source Projects using ${topic.slug}`,
    description: `A collection of the best open source projects using ${topic.slug}. Find the best tools for ${topic.slug} that are open source and free to use/self-hostable.`,
  };

  return (
    <>
      <Intro {...meta} />

      <Grid>
        {topic.tools.map(({ tool }) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!topic.tools?.length && (
          <p className="col-span-full">No Open Source software found.</p>
        )}
      </Grid>

      <BackButton href="/topics" />
    </>
  );
}
