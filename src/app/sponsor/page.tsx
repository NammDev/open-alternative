import { Card } from "@/components/app-ui/Card";
import { H3 } from "@/components/app-ui/Heading";
import { Intro } from "@/components/app-ui/Intro";
import {
  GithubIcon,
  HandHeartIcon,
  SendIcon,
  SquareAsteriskIcon,
} from "lucide-react";
import { Sponsoring } from "./Sponsoring";

export default function SubmitPage() {
  const meta = {
    title: "Supercharge your sales with sponsored listing",
    description:
      "Ensure the long-term success and growth of your business by sponsoring our comprehensive open source directory. Your support helps promote open source nextjs, fosters innovation, and makes a lasting positive impact.",
  };
  const benefits = [
    {
      icon: <SquareAsteriskIcon className="size-full" />,
      title: "Homepage Ad",
      description:
        "Get featured on our homepage with a banner ad linking to your website.",
      footer: "~500 Visitors per day",
    },
    {
      icon: <HandHeartIcon className="size-full" />,
      title: "Support OSS",
      description:
        "Support the open-source community and help us maintain the directory.",
      footer: "175+ Supported Projects",
    },
    {
      icon: <SendIcon className="size-full" />,
      title: "Newsletter Mention",
      description:
        "Get featured in our monthly newsletter read by OpenSource/tech enthusiasts.",
      footer: "600+ Subscribers",
      exclusive: true,
    },
    {
      icon: <GithubIcon className="size-full" />,
      title: "GitHub Link",
      description:
        'Display your link in a special "Sponsors" section in our GitHub repository.',
      footer: "350+ Stars",
      exclusive: true,
    },
  ];

  return (
    <>
      <Intro {...meta} />

      <Sponsoring className="max-w-2xl" />

      <div className="mt-4 flex max-w-2xl flex-col items-start gap-8">
        <Intro
          title="What do I get for sponsoring?"
          description="We offer a variety of benefits to our sponsors. Explore our real-time analytics to see what impact sponsoring could have on your business."
          headingProps={{ size: "h2" }}
        />

        <div className="grid w-full gap-4 grid-auto-fill-xl">
          {benefits.map((benefit) => (
            <Card key={benefit.title}>
              <Card.Header>
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background p-1.5">
                  {benefit.icon}
                </div>

                <H3>
                  {benefit.title}
                  {benefit.exclusive && <span className="text-muted">*</span>}
                </H3>
              </Card.Header>

              <Card.Description>{benefit.description}</Card.Description>
              <Card.Footer>{benefit.footer}</Card.Footer>
            </Card>
          ))}
        </div>

        <p className="text-sm text-muted">
          *Available only for sponsors who purchased 30 days or more.
        </p>
      </div>
    </>
  );
}
