import { CategoryMany } from "@/lib/actions/categories";
import type { HTMLAttributes } from "react";
import { CardSimple } from "./CardSimple";

type CategoryRecordProps = HTMLAttributes<HTMLElement> & {
  category: CategoryMany;
};

export const CategoryRecord = ({ category, ...props }: CategoryRecordProps) => {
  return (
    <CardSimple
      href={`/categories/${category.slug}`}
      label={category.name}
      caption={`${category._count.tools} tools`}
      {...props}
    />
  );
};
