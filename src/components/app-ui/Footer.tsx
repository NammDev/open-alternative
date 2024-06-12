import { GithubIcon, RssIcon, TwitterIcon } from "lucide-react";
import type { HTMLAttributes } from "react";
import { GITHUB_URL, RSS_URL, SITE_EMAIL, TWITTER_URL } from "@/lib/constants";
import { cx } from "@/lib/cva";
import { H6 } from "./Heading";
import { NavigationLink } from "./NavigationLink";
import { Series } from "./Series";
import Link from "next/link";

export const Footer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <footer
      className={cx("flex flex-col justify-between gap-4", className)}
      {...props}
    >
      <Series className="text-sm/normal md:gap-x-4">
        <H6>Explore:</H6>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/technologies"
        >
          Technologies
        </Link>
        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/categories"
        >
          Categories
        </Link>
        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/languages"
        >
          Languages
        </Link>
        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/topics"
        >
          Topics
        </Link>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50 sm:ml-auto"
          href="/sponsor"
        >
          Sponsor
        </Link>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href={`mailto:${SITE_EMAIL}`}
          target="_blank"
          rel="nofollow noreferrer"
        >
          Contact
        </Link>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href={RSS_URL}
          target="_blank"
          title="Twitter"
          rel="nofollow noreferrer"
        >
          <RssIcon className="size-[1.44em] stroke-[1.25]" />
        </Link>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href={TWITTER_URL}
          target="_blank"
          title="Twitter"
          rel="nofollow noreferrer"
        >
          <TwitterIcon className="size-[1.44em] stroke-[1.25]" />
        </Link>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href={GITHUB_URL}
          target="_blank"
          title="Source"
          rel="nofollow noreferrer"
        >
          <GithubIcon className="size-[1.44em] stroke-[1.25]" />
        </Link>
      </Series>

      {children}
    </footer>
  );
};
