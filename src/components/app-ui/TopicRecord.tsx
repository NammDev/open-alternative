import { TopicMany } from "@/lib/actions/topics";
import plur from "plur";
import type { HTMLAttributes } from "react";
import { CardSimple } from "./CardSimple";

type TopicRecordProps = HTMLAttributes<HTMLElement> & {
  topic: TopicMany;
};

export const TopicRecord = ({ topic, ...props }: TopicRecordProps) => {
  return (
    <CardSimple
      href={`/topics/${topic.slug}`}
      label={topic.slug}
      caption={`${topic._count.tools} ${plur("tool", topic._count.tools)}`}
      {...props}
    />
  );
};
