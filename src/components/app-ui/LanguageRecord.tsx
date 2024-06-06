import { LanguageMany } from "@/lib/actions/languages";
import plur from "plur";
import type { HTMLAttributes } from "react";
import { CardSimple } from "./CardSimple";

type LanguageRecordProps = HTMLAttributes<HTMLElement> & {
  language: LanguageMany;
};

export const LanguageRecord = ({ language, ...props }: LanguageRecordProps) => {
  return (
    <CardSimple
      href={`/languages/${language.slug}`}
      label={
        <div className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: language.color ?? undefined }}
          />
          {language.name}
        </div>
      }
      caption={`${language._count.tools} ${plur("tool", language._count.tools)}`}
      {...props}
    />
  );
};
