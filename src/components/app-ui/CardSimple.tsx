import type { ReactNode } from "react";
import { cx } from "@/lib/cva";
import { H5 } from "./Heading";
import Link, { LinkProps } from "next/link";

type CardSimpleProps = LinkProps & {
  label: ReactNode;
  caption?: ReactNode;
};

export const CardSimple = ({ ...props }: CardSimpleProps) => {
  const { label, caption, ...rest } = props;

  return (
    <Link
      className={cx("group -my-2 flex min-w-0 items-center gap-4 py-2 fade-in")}
      {...rest}
    >
      <H5 as="h3" className="truncate group-hover:underline">
        {label}
      </H5>

      <span className="h-px flex-1 bg-current opacity-15" />
      {caption && (
        <span className="shrink-0 text-xs text-secondary">{caption}</span>
      )}
    </Link>
  );
};
