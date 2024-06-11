import type { Hit as AlgoliaHit } from "instantsearch.js";
import {
  GitForkIcon,
  LucideYoutube,
  StarIcon,
  TimerIcon,
  YoutubeIcon,
} from "lucide-react";
import type { HTMLAttributes } from "react";
import { Highlight } from "react-instantsearch";
import { format } from "timeago.js";
import { cx } from "@/lib/cva";
import Link from "next/link";
import { Card } from "./Card";
import { H4 } from "./Heading";
import { Favicon } from "./Favicon";
import { Insights } from "./Insights";

// import type { ToolMany } from "~/services.server/api";
type Tool = any;

type ToolRecordProps = HTMLAttributes<HTMLElement> & {
  tool: Tool;
};

export const ToolRecord = ({ className, tool, ...props }: ToolRecordProps) => {
  const insights = [
    { label: "Stars", value: tool.stars.toLocaleString(), icon: StarIcon },
    // { label: "Forks", value: tool.forks.toLocaleString(), icon: GitForkIcon },
    {
      label: "LOCS",
      value: tool.linesOfCode.toLocaleString(),
      icon: GitForkIcon,
    },
    {
      label: "Last commit",
      value: tool.lastCommitDate && format(tool.lastCommitDate),
      icon: TimerIcon,
    },
  ];

  return (
    <Link
      href={`/${tool.slug}`}
      className={cx("group flex", className)}
      {...props}
    >
      <Card>
        <Card.Header>
          <Favicon src={tool.faviconUrl} title={tool.name} />

          <H4 as="h3" className="truncate">
            <ToolHighlight tool={tool} attribute="name" />
          </H4>

          <LucideYoutube className="ml-auto h-9 w-9 text-red-600" />
        </Card.Header>

        {tool.description && (
          <Card.Description>
            <ToolHighlight tool={tool} attribute="description" />
          </Card.Description>
        )}

        <Insights insights={insights} className="mt-auto" />
      </Card>
    </Link>
  );
};

const ToolHighlight = ({
  tool,
  attribute,
}: {
  tool: Tool;
  attribute: keyof Tool;
}) => {
  if (!(tool as AlgoliaHit<Tool>)._highlightResult) {
    return <>{tool[attribute]}</>;
  }

  return (
    <Highlight
      hit={tool as AlgoliaHit<Tool>}
      attribute={attribute}
      classNames={{ highlighted: "bg-pink-600 text-white" }}
    />
  );
};
