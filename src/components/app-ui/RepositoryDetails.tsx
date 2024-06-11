import {
  CopyrightIcon,
  GitForkIcon,
  MoveRightIcon,
  Ruler,
  StarIcon,
  TimerIcon,
  FileIcon,
} from "lucide-react";
import type { HTMLAttributes } from "react";
import { format } from "timeago.js";
import { cx } from "@/lib/cva";
import { Button } from "./Button";
import { H5 } from "./Heading";
import { Insights } from "./Insights";
import { NavigationLink } from "./NavigationLink";
import { Series } from "./Series";
import { LanguageToTool, Tool } from "@prisma/client";
import Link from "next/link";

type RepositoryDetailsProps = HTMLAttributes<HTMLElement> & {
  tool: Tool;
  languages: LanguageToTool[];
};

export const RepositoryDetails = ({
  className,
  tool,
  languages,
  ...props
}: RepositoryDetailsProps) => {
  const insights = [
    { label: "Stars", value: tool.stars.toLocaleString(), icon: StarIcon },
    { label: "Forks", value: tool.forks.toLocaleString(), icon: GitForkIcon },
    {
      label: "Lines Of Code",
      value: tool.linesOfCode.toLocaleString(),
      icon: Ruler,
    },
    {
      label: "Number Of File",
      value: tool.files.toLocaleString(),
      icon: FileIcon,
    },
    {
      label: "Last commit",
      value: tool.lastCommitDate && format(tool.lastCommitDate),
      title: tool.lastCommitDate ?? undefined,
      icon: TimerIcon,
    },
    { label: "License", value: tool.license, icon: CopyrightIcon },
  ];

  return (
    <div
      className={cx(
        "flex flex-col gap-5 rounded-lg border px-6 py-5",
        className,
      )}
      {...props}
    >
      <Series direction="column">
        <H5>Repository details:</H5>
        <Insights insights={insights} className="text-sm" />
      </Series>

      {!!languages.length && (
        <Series direction="column">
          <H5>Written in:</H5>

          {languages?.map(({ percentage, language }) => (
            <h6 key={language.slug}>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href={`/languages/${language.slug}`}
              >
                <span
                  className="size-2 rounded-full"
                  style={{ backgroundColor: language.color ?? undefined }}
                />
                {language.name}{" "}
                <span className="opacity-50">({percentage}%)</span>
              </Link>
            </h6>
          ))}
        </Series>
      )}

      {tool.repository && (
        <Button
          size="md"
          variant="secondary"
          suffix={
            <MoveRightIcon className="duration-150 group-hover:translate-x-0.5" />
          }
          className="mt-1"
          asChild
        >
          <a href={tool.repository} target="_blank" rel="noreferrer nofollow">
            View Repository
          </a>
        </Button>
      )}
    </div>
  );
};
