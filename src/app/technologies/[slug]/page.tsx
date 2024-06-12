import { BackButton } from "@/components/app-ui/BackButton";
import { Button } from "@/components/app-ui/Button";
import { Card } from "@/components/app-ui/Card";
import { Favicon } from "@/components/app-ui/Favicon";
import { Grid } from "@/components/app-ui/Grid";
import { H3 } from "@/components/app-ui/Heading";
import { Intro } from "@/components/app-ui/Intro";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import { getTechnologysBySlug } from "@/lib/actions/technology";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

export default async function TechnologiesPage({
  params,
}: {
  params: { slug: string };
}) {
  const technogoly = await getTechnologysBySlug(params.slug);
  const meta = {
    title: `Best Open Source ${technogoly.name} NextJs`,
    description: `A collection of the best open source ${technogoly.name} NextJs. Find the best NextJs for ${technogoly.name} that are open source and free to use/self-hostable.`,
  };

  return (
    <>
      <Intro
        title={meta.title}
        description={`Find the best NextJs to ${technogoly.name} that are open source and free to use/self-hostable.`}
      />

      <Grid>
        <Card className="group bg-background" asChild>
          <Link
            href={technogoly.website}
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            <Card.Header>
              <Favicon src={technogoly.faviconUrl} title={technogoly.name} />

              <H3 className="truncate">{technogoly.name}</H3>
            </Card.Header>

            {technogoly.description && (
              <p className="-tracking-0.5 relative line-clamp-4 text-sm/normal text-secondary">
                {technogoly.description}
              </p>
            )}

            <Button
              size="md"
              className="pointer-events-none mt-auto border-transparent bg-pink-600 text-white hover:bg-pink-700"
              suffix={
                <MoveRightIcon className="duration-150 group-hover:translate-x-0.5" />
              }
              asChild
            >
              <span>Visit Website</span>
            </Button>
          </Link>
        </Card>

        {technogoly.tools.map(({ tool }) => (
          <ToolRecord key={tool.id} tool={tool} />
        ))}

        {!technogoly.tools?.length && (
          <p className="col-span-full">No Open Source Nextjs found.</p>
        )}
      </Grid>

      <BackButton href="/technologies" />
    </>
  );
}
