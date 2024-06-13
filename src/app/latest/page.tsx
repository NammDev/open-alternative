import { BackButton } from "@/components/app-ui/BackButton";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getToolsLatest } from "@/lib/actions/tools";
import UpdateAlgolia from "./updateAlgolia";

const meta = {
  title: "Recently added Open Source Software",
  description:
    "A collection of the latest open source tools added to the directory. Browse and discover new tools to use in your projects.",
};

export default async function CategoriesPage() {
  const tools = await getToolsLatest();

  return (
    <>
      <Intro {...meta} />
      <UpdateAlgolia />
      <Grid>
        {tools.map((tool) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!tools?.length && (
          <p className="col-span-full">No recent Open Source software found.</p>
        )}
      </Grid>
      <BackButton href="/" />
    </>
  );
}
