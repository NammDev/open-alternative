/* eslint-disable @next/next/no-img-element */
import { BackButton } from "@/components/app-ui/BackButton";
import { Button } from "@/components/app-ui/Button";
import { FaviconImage } from "@/components/app-ui/Favicon";
import { Grid } from "@/components/app-ui/Grid";
import { H1, H4 } from "@/components/app-ui/Heading";
import { Prose } from "@/components/app-ui/Prose";
import { RepositoryDetails } from "@/components/app-ui/RepositoryDetails";
import { Series } from "@/components/app-ui/Series";
import { Tag } from "@/components/app-ui/Tag";
import { TechnologyRecord } from "@/components/app-ui/TechnologyRecord";
import { ToolRecord } from "@/components/app-ui/ToolRecord";
import {
  getCategoriesTool,
  getToolsRelated,
} from "@/lib/actions/categorytotool";
import { getLanguages } from "@/lib/actions/languagetotool";
import { getTechnologys } from "@/lib/actions/technologyToTool";
import { getTool } from "@/lib/actions/tools";
import { getTopics } from "@/lib/actions/topictotool";
import { HashIcon, MoveRightIcon, TagIcon } from "lucide-react";
import { notFound } from "next/navigation";
import AddCategoryToToolDialog from "./add-category";
import AddTechToToolDialog from "./add-tech";
import EditContentToolDialog from "./edit-content";
import EditDescriptionDialog from "./edit-description";

export default async function ToolsPage({
  params: { slug },
}: {
  params: {
    slug: string;
  };
}) {
  const [tool, technologies, categories, languages, topics, relatedTools] =
    await Promise.all([
      getTool(slug),
      getTechnologys(slug),
      getCategoriesTool(slug),
      getLanguages(slug),
      getTopics(slug),
      getToolsRelated(slug),
    ]);

  if (!tool) {
    notFound();
  }

  return (
    <div
      className="flex flex-col gap-12"
      style={{ viewTransitionName: "tool" }}
    >
      <div className="grid items-start gap-6 md:grid-cols-3">
        <div className="flex flex-1 flex-wrap items-start gap-10 md:col-span-2 md:gap-12">
          <div className="flex flex-1 flex-col items-start gap-4 md:gap-6">
            <div className="flex w-full flex-col items-start gap-y-4">
              <Series size="lg" className="w-full">
                <FaviconImage
                  src={tool.faviconUrl}
                  title={tool.name}
                  style={{ viewTransitionName: "tool-favicon" }}
                />

                <H1 style={{ viewTransitionName: "tool-title" }}>
                  {tool.name}
                </H1>
              </Series>

              {tool.description && (
                <Prose>
                  <h2
                    className="lead !font-normal !tracking-normal !text-secondary"
                    style={{ viewTransitionName: "tool-description" }}
                  >
                    {tool.description}
                  </h2>
                </Prose>
              )}
            </div>

            {tool.website && (
              <div className="flex">
                <Button
                  suffix={
                    <MoveRightIcon className="duration-150 group-hover:translate-x-0.5" />
                  }
                  asChild
                >
                  <a
                    href={tool.website}
                    target="_blank"
                    rel="nofollow noreferrer"
                  >
                    View Website
                  </a>
                </Button>
                <AddCategoryToToolDialog
                  slug={slug}
                  categoriesByTool={categories}
                />
                <AddTechToToolDialog
                  slug={slug}
                  technologiesByTool={technologies}
                />
                {/* <EditDescriptionDialog
                  slug={slug}
                  description={tool.description || ""}
                /> */}
                {tool.content && (
                  <EditContentToolDialog slug={slug} content={tool.content} />
                )}
              </div>
            )}
            {tool.youtube && (
              <Button
                className="bg-red-600 text-white"
                suffix={
                  <MoveRightIcon className="duration-150 group-hover:translate-x-0.5" />
                }
                asChild
              >
                <a
                  href={tool.youtube}
                  target="_blank"
                  rel="nofollow noreferrer"
                >
                  View Youtube
                </a>
              </Button>
            )}
          </div>

          <RepositoryDetails
            tool={tool}
            languages={languages}
            className="max-sm:w-full md:hidden"
          />

          {tool.screenshotUrl && (
            <img
              src={tool.screenshotUrl}
              alt={`Screenshot of ${tool.name} website`}
              width={1280}
              height={1024}
              loading="eager"
              className="aspect-video h-auto w-full rounded-md border object-cover object-top"
            />
          )}

          {tool.content && (
            <Prose>
              <div
                className="prose !font-normal !tracking-normal !text-secondary"
                style={{ viewTransitionName: "tool-content" }}
                dangerouslySetInnerHTML={{ __html: tool.content }}
              />
            </Prose>
          )}

          {/* Categories */}
          {!!categories.length && (
            <Series direction="column" className="w-full">
              <H4 as="h3">Categories:</H4>

              <Series>
                {categories?.map(({ category }) => (
                  <Tag key={category.id} href={`/categories/${category.slug}`}>
                    <TagIcon className="mr-0.5 size-[0.9em] opacity-50" />
                    {category.name}
                  </Tag>
                ))}
              </Series>
            </Series>
          )}

          {/* Topics */}
          {!!topics.length && (
            <Series size="lg" direction="column" className="w-full">
              <H4 as="h3">Related topics:</H4>

              <Series className="w-full">
                {topics?.map(({ topic }) => (
                  <Tag key={topic.slug} href={`/topics/${topic.slug}`}>
                    <HashIcon className="size-[0.9em] opacity-50" />
                    {topic.slug}
                  </Tag>
                ))}
              </Series>
            </Series>
          )}
        </div>

        <div className="sticky top-14 max-md:hidden">
          <RepositoryDetails tool={tool} languages={languages} />
        </div>
      </div>

      {!!technologies.length && (
        <Series size="lg" direction="column">
          <H4 as="h3">{tool.name} use theses Technologies & NPM:</H4>

          <Grid className="w-full">
            {technologies?.map(({ technology }) => (
              <TechnologyRecord key={technology.id} technology={technology} />
            ))}
          </Grid>
        </Series>
      )}

      {!!relatedTools.length && (
        <Series size="lg" direction="column">
          <H4 as="h3">Other Open Source Nextjs similar to {tool.name}:</H4>

          <Grid className="w-full">
            {relatedTools.map(({ tool }) => (
              <ToolRecord key={tool.id} tool={tool} />
            ))}
          </Grid>
        </Series>
      )}

      <BackButton href="/" />
    </div>
  );
}
