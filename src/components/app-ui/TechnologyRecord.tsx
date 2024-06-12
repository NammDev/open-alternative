import type { HTMLAttributes } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { Favicon } from "./Favicon";
import { H4 } from "./Heading";
import { TechnologyMany } from "@/lib/actions/technology";

type TechnologyRecordProps = HTMLAttributes<HTMLElement> & {
  technology: TechnologyMany;
  showCount?: boolean;
};

export const TechnologyRecord = ({
  technology,
  showCount,
  ...props
}: TechnologyRecordProps) => {
  return (
    <Card asChild>
      <Link href={`/technologies/${technology.slug}`} {...props}>
        <Card.Header>
          <Favicon src={technology.faviconUrl} title={technology.name} />

          <H4 as="h3" className="truncate">
            {technology.name}
          </H4>
        </Card.Header>

        {technology.description && (
          <Card.Description>{technology.description}</Card.Description>
        )}

        {showCount && (
          <Card.Footer>{technology._count.tools} technology</Card.Footer>
        )}
      </Link>
    </Card>
  );
};
