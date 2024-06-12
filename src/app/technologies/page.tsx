import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { TechnologyRecord } from "@/components/app-ui/TechnologyRecord";
import { getTechnologies } from "@/lib/actions/technology";

const meta = {
  title: "Technologies & NPM",
  description:
    "Browse top technologies to find your best Open Source software tools.",
};

export default async function TechnologiesIndex() {
  const technologies = await getTechnologies();

  return (
    <>
      <Intro {...meta} />
      <Grid>
        {technologies.map((technology) => (
          <TechnologyRecord
            key={technology.id}
            technology={technology}
            showCount
          />
        ))}

        {!technologies.length && (
          <p className="col-span-full">No technologies found.</p>
        )}
      </Grid>
    </>
  );
}
