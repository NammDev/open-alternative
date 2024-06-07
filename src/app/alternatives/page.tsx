import { AlternativeRecord } from "@/components/app-ui/AlternativeRecord";
import { CategoryRecord } from "@/components/app-ui/CategoryRecord";
import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { getAlternatives } from "@/lib/actions/alternatives";

const meta = {
  title: "Open Source Software Alternatives",
  description:
    "Browse top alternatives to find your best Open Source software tools.",
};

export default async function AlternativesIndex() {
  const alternatives = await getAlternatives();

  return (
    <>
      <Intro {...meta} />
      <Grid>
        {alternatives.map((alternative) => (
          <AlternativeRecord
            key={alternative.id}
            alternative={alternative}
            showCount
          />
        ))}

        {!alternatives.length && (
          <p className="col-span-full">No alternatives found.</p>
        )}
      </Grid>
    </>
  );
}
