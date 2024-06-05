// import { updateUrlWithSearchParams } from "~/utils/queryString";

import { cx } from "@/lib/cva";
import { Button } from "./Button";
import { Card, type CardProps } from "./Card";
import { H4 } from "./Heading";
import { Logo } from "./Logo";
import Link from "next/link";
import { Favicon } from "./Favicon";

export const SponsoredCard = () => {
  const sponsoring = {
    website: "https://preline.co",
    name: "Preline UI",
    description:
      "Open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.",
  };

  return (
    <Card className={cx("order-2")} asChild>
      <Link
        href={sponsoring?.website ? sponsoring.website : "/sponsor"}
        target={sponsoring?.website ? "_blank" : "_self"}
        rel={sponsoring?.website ? "noopener noreferrer" : ""}
        // onClick={() =>
        //   posthog.capture("sponsoring_clicked", { url: sponsoring?.website })
        // }
      >
        <Card.Header>
          <Favicon
            src={`https://www.google.com/s2/favicons?sz=128&domain_url=${sponsoring?.website}`}
          />

          <H4 as="h3" className="truncate">
            {sponsoring?.name || "Sponsor OpenAlternative"}
          </H4>
        </Card.Header>

        <Card.Description className="mb-auto line-clamp-4">
          {sponsoring?.description ||
            "Reach out to our audience of professional open source/tech enthusiasts to boost your sales."}
        </Card.Description>

        <Button className="pointer-events-none w-full" asChild>
          <span>
            {sponsoring ? `Visit ${sponsoring.name}` : "Become a sponsor"}
          </span>
        </Button>

        <Logo className="pointer-events-none absolute -bottom-1/4 -right-1/4 size-64 rotate-45 opacity-[3.5%]" />
      </Link>
    </Card>
  );
};
