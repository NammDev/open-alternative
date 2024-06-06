import { BackButton } from "@/components/app-ui/BackButton";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getCategoriesBySlug } from "@/lib/actions/categories";

type CategoriesPageProps = {
  params: { slug: string };
};

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const category = await getCategoriesBySlug(params.slug);
  const meta = {
    title: `Best Open Source ${category.name} Software`,
    description: `A collection of the best open source ${category.name} tools. Find the best tools for ${category.name} that are open source and free to use/self-hostable.`,
  };

  return (
    <>
      <Intro {...meta} />

      <Grid>
        {category.tools.map(({ tool }) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!category.tools?.length && (
          <p className="col-span-full">No Open Source software found.</p>
        )}
      </Grid>

      <BackButton href="/categories" />
    </>
  );
}
