import type { HTMLAttributes } from "react";
import {
  type UseRefinementListProps,
  useRefinementList,
} from "react-instantsearch";
import { H6 } from "../app-ui/Heading";
import { cx } from "@/lib/cva";
import { Input } from "../app-ui/Input";
import { Badge } from "../app-ui/Badge";

type RefinementListProps = HTMLAttributes<HTMLDivElement> &
  UseRefinementListProps;

export const RefinementList = ({
  className,
  ...props
}: RefinementListProps) => {
  const {
    items,
    refine,
    searchForItems,
    isShowingMore,
    toggleShowMore,
    canToggleShowMore,
  } = useRefinementList(props);

  return (
    <div className={cx("flex flex-col gap-2", className)}>
      <H6 className="capitalize">{props.attribute}</H6>

      <Input
        type="search"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        maxLength={512}
        placeholder={`Search ${props.attribute}`}
        onChange={(e) => searchForItems(e.currentTarget.value)}
        className="!min-w-[0] px-2 py-1 !text-xs font-normal outline-offset-0"
      />

      <div
        className={cx(
          "flex flex-col px-2",
          isShowingMore && "max-h-60 overflow-auto overscroll-contain",
        )}
      >
        {items?.map((item) => (
          <label
            key={item.label}
            className="flex cursor-pointer select-none items-center gap-2.5 text-[13px] text-secondary hover:!text-pink-500"
          >
            <input
              type="checkbox"
              checked={item.isRefined}
              onChange={() => refine(item.value)}
            />
            <span className="flex-1 truncate">{item.label}</span>
            <Badge size="sm">{item.count}</Badge>
          </label>
        ))}

        {!items.length && (
          <p className="text-xs text-secondary">No results found</p>
        )}
      </div>

      <button
        type="button"
        onClick={toggleShowMore}
        disabled={!canToggleShowMore}
        className="group -m-0.5 flex cursor-pointer items-center gap-2 p-0.5 !text-xs -tracking-micro text-muted hover:text-foreground disabled:opacity-50"
      >
        {isShowingMore ? "Show less" : "Show more"}
      </button>
    </div>
  );
};
