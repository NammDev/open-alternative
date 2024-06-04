import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cva";

export const Prose = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx(
        "prose prose-neutral text-secondary dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground first:prose-p:mt-0 last:prose-p:mb-0 prose-a:font-normal prose-a:text-foreground hover:prose-a:text-pink-500 prose-pre:rounded-none prose-pre:font-mono first:prose-ul:mt-0 last:prose-ul:mb-0 prose-li:m-0 prose-img:rounded-md prose-img:border prose-img:border-neutral-200 prose-lead:text-lg/relaxed",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
