import { Prose } from "@/components/app-ui/Prose";
import { Intro } from "@/components/app-ui/Intro";
import { SITE_NAME } from "@/lib/constants";
import { CreateToolForm } from "./create-tool-form";

const meta = {
  title: "Submit your Open Source Software",
  description: `Help us grow the list of open source alternatives to proprietary software. Contribute to ${SITE_NAME} by submitting a new open source alternative.`,
};

export default function SubmitPage() {
  return (
    <>
      <Intro {...meta} />
      <div className="flex flex-col-reverse items-start gap-12 lg:flex-row">
        <CreateToolForm />
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
