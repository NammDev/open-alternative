import type { HTMLAttributes } from "react";
import { cx } from "@/lib/cva";
import { RangeSlider } from "./RangeSlider";
import { RefinementList } from "./RefinementList";

export const Refinements = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  return (
    <div
      className={cx(
        "grid w-full justify-between gap-6 rounded-md border px-6 py-4 grid-auto-fill-xs",
        className,
      )}
      {...props}
    >
      <RefinementList attribute="categories" showMoreLimit={256} showMore />
      <RefinementList attribute="alternatives" showMoreLimit={256} showMore />
      <RefinementList attribute="languages" showMoreLimit={256} showMore />
      <RefinementList attribute="topics" showMoreLimit={512} showMore />

      <RangeSlider attribute="stars" />
      <RangeSlider attribute="forks" />
    </div>
  );
};
