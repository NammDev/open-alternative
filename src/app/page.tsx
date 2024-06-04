import { Badge } from "@/components/app-ui/Badge";
import { Intro } from "@/components/app-ui/Intro";
import { Ping } from "@/components/app-ui/Ping";
import Image from "next/image";
import Link from "next/link";
// import { InstantSearchSSRProvider, getServerState } from "react-instantsearch";

export default function Home() {
  return (
    <>
      <div className="flex gap-6">
        <section className="flex flex-col gap-y-6 md:flex-1">
          <Intro
            title="Discover Open Source Alternatives to Popular Software"
            description="We’ve curated some great open source alternatives to tools that your business requires in day-to-day operations."
            className="max-w-[40rem] text-pretty"
          >
            {true && (
              <Badge
                className="order-first inline-flex items-center gap-1.5 rounded-md px-2 py-1"
                asChild
              >
                <Link href="/latest">
                  <Ping /> 3 tools added this week
                </Link>
              </Badge>
            )}
          </Intro>

          {/* <Newsletter placeholder="Join the newsletter" buttonVariant="fancy" /> */}
        </section>

        {/* <ProductHuntCard launch={launch} className="max-md:hidden md:w-60" /> */}
      </div>

      {/* <InstantSearchSSRProvider key={key} {...serverState}>
        <Search url={url} sponsoring={sponsoring} />
      </InstantSearchSSRProvider> */}
    </>
  );
}
