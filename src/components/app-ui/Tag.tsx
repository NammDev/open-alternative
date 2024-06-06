import { cx } from "@/lib/cva";
import Link, { LinkProps } from "next/link";
import { LinkHTMLAttributes } from "react";

export const Tag = ({ ...props }: LinkProps) => {
  return (
    <Link
      className={cx([
        "relative inline-flex items-center justify-center gap-[0.6ch] px-[0.6em] py-[0.125em] text-[13px]",
        "rounded border bg-card text-center font-medium -tracking-micro text-secondary hover:border-border-dark hover:bg-card-dark",
      ])}
      {...props}
    />
  );
};
