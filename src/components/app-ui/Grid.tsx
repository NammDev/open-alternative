import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cva";

export const Grid = ({ className, ...props }: HTMLAttributes<HTMLElement>) => {
  return (
    <div className={cx("grid gap-6 grid-auto-fill-md", className)} {...props} />
  );
};
