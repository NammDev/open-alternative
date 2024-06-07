import { BackButton } from "@/components/app-ui/BackButton";
import { Button } from "@/components/app-ui/Button";
import { Card } from "@/components/app-ui/Card";
import { Favicon } from "@/components/app-ui/Favicon";
import { Grid } from "@/components/app-ui/Grid";
import { H3 } from "@/components/app-ui/Heading";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getAlternativesBySlug } from "@/lib/actions/alternatives";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default async function AlternativesPage({
  params,
}: {
  params: { slug: string };
}) {
  const alternative = await getAlternativesBySlug(params.slug);
  const meta = {
    title: `Best Open Source ${alternative.name} Alternatives`,
    description: `A collection of the best open source ${alternative.name} alternatives. Find the best alternatives for ${alternative.name} that are open source and free to use/self-hostable.`,
  };

  return (
    <>
      <Intro
        title={meta.title}
        description={`Find the best alternatives to ${alternative.name} that are open source and free to use/self-hostable.`}
      />

      <Grid>
        <Card className="group bg-background" asChild>
          <Link
            href={alternative.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <Card.Header>
              <Favicon src={alternative.faviconUrl} title={alternative.name} />

              <H3 className="truncate">{alternative.name}</H3>
            </Card.Header>

            {alternative.description && (
              <p className="-tracking-0.5 relative line-clamp-4 text-sm/normal text-secondary">
                {alternative.description}
              </p>
            )}

            <Button
              variant={
                alternative.website.includes("go.") ? "fancy" : "primary"
              }
              size="md"
              className="pointer-events-none mt-auto"
              suffix={
                <MoveRightIcon className="duration-150 group-hover:translate-x-0.5" />
              }
              asChild
            >
              <span>Visit Website</span>
            </Button>
          </Link>
        </Card>

        {alternative.tools.map(({ tool }) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!alternative.tools?.length && (
          <p className="col-span-full">No Open Source alternatives found.</p>
        )}
      </Grid>

      <BackButton href="/alternatives" />
    </>
  );
}
