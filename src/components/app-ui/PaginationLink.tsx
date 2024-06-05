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
    <Link className={"rounded-sm bg-card-dark"} {...props}>
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
