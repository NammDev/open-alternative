import { Slot } from "@radix-ui/react-slot";
import type { HTMLAttributes, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

type PaginationLinkProps = Omit<
  HTMLAttributes<HTMLElement> & LinkProps,
  "prefix"
> & {
  prefix?: ReactNode;
  suffix?: ReactNode;
  isDisabled?: boolean;
};

export const PaginationLink = ({
  children,
  className,
  prefix,
  suffix,
  isDisabled,
  ...props
}: PaginationLinkProps) => {
  return (
    <Link
      className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 text-sm -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
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
