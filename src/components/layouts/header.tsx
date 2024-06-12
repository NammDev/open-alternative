"use client";

import {
  BlocksIcon,
  BracesIcon,
  ChevronDownIcon,
  GemIcon,
  GithubIcon,
  LoaderIcon,
  MenuIcon,
  PlusIcon,
  SmilePlusIcon,
  TagIcon,
  XIcon,
} from "lucide-react";
import { cn, getRepoOwnerAndName } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/app-ui/DropdownMenu";
import Link from "next/link";
import { GITHUB_URL, SITE_NAME, SWR_CONFIG } from "@/lib/constants";
import { Badge } from "../app-ui/Badge";
import { Series } from "../app-ui/Series";
import { Button } from "../app-ui/Button";
import { Ping } from "../app-ui/Ping";
import useSWR from "swr";
import { fetcher } from "@/lib/fetchers";
import { ThemeSwitcher } from "../app-ui/ThemeSwitcher";
import { Logo } from "../app-ui/Logo";

export const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const repo = getRepoOwnerAndName(GITHUB_URL);
  const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });

  // Close the mobile navigation when the user presses the "Escape" key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  // const { data, error, isLoading } = useSWR<number>(
  //   { url: "/api/fetch-repository-stars", ...repo },
  //   fetcher,
  //   SWR_CONFIG,
  // );

  return (
    <div
      className={cn(
        "sticky top-0 z-10 -my-3 flex flex-wrap items-center gap-3 bg-background/95 py-3 backdrop-blur-sm md:gap-4",
      )}
    >
      <button
        type="button"
        onClick={() => setNavOpen(!isNavOpen)}
        className="lg:hidden"
      >
        <MenuIcon
          className={cn("size-6 stroke-[1.5]", isNavOpen && "hidden")}
        />
        <XIcon className={cn("size-6 stroke-[1.5]", !isNavOpen && "hidden")} />
        <span className="sr-only">Toggle navigation</span>
      </button>

      <ol
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        className={cn("mr-auto flex items-center gap-2.5")}
      >
        <li
          className={cn("group contents")}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            itemProp="item"
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm font-medium -tracking-micro text-foreground hover:text-foreground disabled:opacity-50 group-only:font-medium group-only:text-foreground group-last:group-[&:not(:only-child)]:line-clamp-1 max-md:font-medium max-md:text-foreground"
          >
            <Logo className="size-5 shrink-0" />
            <span itemProp="name">{SITE_NAME}</span>
          </Link>
          <meta itemProp="position" content={`1`} />
        </li>
      </ol>

      <nav className="contents max-lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="group -m-0.5 flex cursor-pointer items-center gap-1 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50">
            Browse <ChevronDownIcon />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href="/latest"
              >
                <GemIcon className="size-4 opacity-75" /> Latest
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href="/categories"
              >
                <BlocksIcon className="size-4 opacity-75" /> Categories
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href="/technologies"
              >
                <SmilePlusIcon className="size-4 opacity-75" /> Technologies
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href="/languages"
              >
                <BracesIcon className="size-4 opacity-75" /> Languages
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
                href="/topics"
              >
                <TagIcon className="size-4 opacity-75" /> Topics
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/about"
        >
          About
        </Link>
        <Link
          className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
          href="/sponsor"
        >
          Sponsor
        </Link>
      </nav>

      <Series size="sm">
        <ThemeSwitcher />

        <Button
          size="sm"
          variant="secondary"
          prefix={<GithubIcon />}
          suffix={
            // <>
            //   {!error && (
            //     <Badge size="sm" className="-my-0.5 size-auto">
            //       {isLoading && <LoaderIcon className="size-3 animate-spin" />}
            //       {data && formatter.format(data)}
            //     </Badge>
            //   )}
            // </>
            <Badge size="sm" className="-my-0.5 size-auto">
              389
            </Badge>
          }
          asChild
        >
          <a href={GITHUB_URL} target="_blank" rel="nofollow noreferrer">
            Star
            <Ping className="absolute -right-1 -top-1" />
          </a>
        </Button>

        <Button
          size="sm"
          variant="secondary"
          prefix={<PlusIcon />}
          className="-my-1.5 max-sm:hidden"
          asChild
        >
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/submit"
          >
            Submit
          </Link>
        </Button>
      </Series>

      {isNavOpen && (
        <nav className="mt-2 flex w-full flex-col gap-y-2 lg:hidden">
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/latest"
          >
            Latest
          </Link>
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/categories"
          >
            Categories
          </Link>
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/technologies"
          >
            Technologies
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
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/submit"
          >
            Submit
          </Link>
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/sponsor"
          >
            Sponsor
          </Link>
          <Link
            className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
            href="/about"
          >
            About
          </Link>
        </nav>
      )}
    </div>
  );
};
