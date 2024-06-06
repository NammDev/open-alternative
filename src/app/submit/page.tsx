import { Button } from "@/components/app-ui/Button";
import { Input } from "@/components/app-ui/Input";
import { Intro } from "@/components/app-ui/Intro";
import { Label } from "@/components/app-ui/Label";
import { Prose } from "@/components/app-ui/Prose";
import { TextArea } from "@/components/app-ui/TextArea";
import { SITE_NAME } from "@/lib/constants";
import { useId } from "react";

export default function SubmitPage() {
  const meta = {
    title: "Submit your Open Source Software",
    description: `Help us grow the list of open source alternatives to proprietary software. Contribute to ${SITE_NAME} by submitting a new open source alternative.`,
  };
  const id = useId();

  return (
    <>
      <Intro {...meta} />
      <div className="flex flex-col-reverse items-start gap-12 lg:flex-row">
        <form
          method="POST"
          action="/api/submit"
          className="grid w-full max-w-xl gap-6 grid-auto-fill-xs"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="name" isRequired>
              Name:
            </Label>

            <Input
              type="text"
              name="name"
              id="name"
              placeholder="PostHog"
              data-1p-ignore
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="website" isRequired>
              Website:
            </Label>

            <Input
              type="url"
              name="website"
              id="website"
              placeholder="https://posthog.com"
              required
            />
          </div>

          <div className="col-span-full flex flex-col gap-1">
            <Label htmlFor="repository" isRequired>
              Repository:
            </Label>

            <Input
              type="url"
              name="repository"
              id="repository"
              placeholder="https://github.com/posthog/posthog"
              required
            />
          </div>

          <div className="col-span-full flex flex-col gap-1">
            <Label htmlFor="description" isRequired>
              Description:
            </Label>

            <TextArea
              name="description"
              id="description"
              rows={3}
              placeholder="A platform that helps engineers build better products"
              required
            />
          </div>

          <div>
            <Button className="min-w-32">Submit</Button>
          </div>
        </form>

        <Prose className="flex-1 text-pretty text-sm/normal">
          <p>
            Please make sure the software you’re submitting meets the following
            criteria:
          </p>

          <ul>
            <li>It’s open source</li>
            <li>It’s free to use or can be self-hosted</li>
            <li>It’s actively maintained</li>
            <li>It’s a good alternative to a proprietary software</li>
          </ul>
        </Prose>
      </div>
    </>
  );
}
