import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/lib/utils";

type PaginationLinkProps = Omit<
  HTMLAttributes<HTMLElement> & LinkProps,
  "prefix"
> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  isDisabled?: boolean;
  isActive?: boolean;
};

export const PaginationLink = ({
  children,
  className,
  prefix,
  suffix,
  isDisabled,
  isActive,
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      className={cn(
        '"group disabled:opacity-50" -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground',
        isDisabled && "pointer-events-none opacity-40",
        isActive && "rounded-sm bg-card-dark font-medium text-foreground",
      )}
      {...props}
    >
      <Slot className="size-5 duration-150 group-hover:-translate-x-0.5">
        {prefix}
      </Slot>

      {children}

      <Slot className="size-5 duration-150 group-hover:translate-x-0.5">
        {suffix}
      </Slot>
    </Link>
  );
};
