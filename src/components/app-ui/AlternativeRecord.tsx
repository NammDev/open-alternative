import type { HTMLAttributes } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { Favicon } from "./Favicon";
import { H4 } from "./Heading";
import { AlternativeMany } from "@/lib/actions/alternativetotool";

type AlternativeRecordProps = HTMLAttributes<HTMLElement> & {
  alternative: AlternativeMany;
  showCount?: boolean;
};

export const AlternativeRecord = ({
  alternative,
  showCount,
  ...props
}: AlternativeRecordProps) => {
  return (
    <Card asChild>
      <Link href={`/alternatives/${alternative.slug}`} {...props}>
        <Card.Header>
          <Favicon src={alternative.faviconUrl} title={alternative.name} />

          <H4 as="h3" className="truncate">
            {alternative.name}
          </H4>
        </Card.Header>

        {alternative.description && (
          <Card.Description>{alternative.description}</Card.Description>
        )}

        {showCount && (
          <Card.Footer>{alternative._count.tools} alternative</Card.Footer>
        )}
      </Link>
    </Card>
  );
};
