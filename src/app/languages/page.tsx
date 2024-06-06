import { Grid } from "@/components/app-ui/Grid";
import { Intro } from "@/components/app-ui/Intro";
import { LanguageRecord } from "@/components/app-ui/LanguageRecord";
import { getLanguages } from "@/lib/actions/languages";

const meta = {
  title: "Most Popular Languages used in Open Source Software",
  description:
    "Browse top languages to find your best Open Source software options.",
};

export default async function LanguagesIndex() {
  const languages = await getLanguages();

  return (
    <>
      <Intro {...meta} />
      <Grid className="md:gap-8">
        {languages.map((language) => (
          <LanguageRecord key={language.slug} language={language} />
        ))}

        {!languages.length && (
          <p className="col-span-full">No languages found.</p>
        )}
      </Grid>
    </>
  );
}
