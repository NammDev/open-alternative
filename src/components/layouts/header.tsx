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
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Breadcrumb } from "../ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { GITHUB_URL } from "@/lib/constants";
import { Badge } from "../app-ui/Badge";
import { Series } from "../app-ui/Series";
import { Button } from "../app-ui/Button";
import { Ping } from "../app-ui/Ping";

export const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const formatter = new Intl.NumberFormat("en-US", { notation: "compact" });

  // Close the mobile navigation when the user presses the "Escape" key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setNavOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

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

      <Breadcrumb className="mr-auto" />

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
                href="/alternatives"
              >
                <SmilePlusIcon className="size-4 opacity-75" /> Alternatives
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
        {/* <ClientOnly>{() => <ThemeSwitcher />}</ClientOnly> */}

        <Button
          size="sm"
          variant="secondary"
          prefix={<GithubIcon />}
          suffix={
            <Badge
              size="sm"
              className="-my-0.5 size-auto px-1 py-px text-[10px]/tight"
            >
              {/* {isLoading && <LoaderIcon className="size-3 animate-spin" />}
              {data && formatter.format(data)} */}
              439
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
            href="/alternatives"
          >
            Alternatives
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
