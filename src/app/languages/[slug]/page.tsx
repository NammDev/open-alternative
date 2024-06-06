import { BackButton } from "@/components/app-ui/BackButton";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getLanguagesBySlug } from "@/lib/actions/languages";

export default async function LanguagesPage({
  params,
}: {
  params: { slug: string };
}) {
  const language = await getLanguagesBySlug(params.slug);
  const meta = {
    title: `Best ${language.name} Open Source Projects`,
    description: ` A collection of the best open source software tools written in ${language.name}. Find the most popular and trending open source projects to learn from, contribute to, or use in your own projects.`,
  };

  return (
    <>
      <Intro {...meta} />

      <Grid>
        {language.tools.map(({ tool }) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!language.tools?.length && (
          <p className="col-span-full">No Open Source software found.</p>
        )}
      </Grid>

      <BackButton href="/languages" />
    </>
  );
}
