import { Fragment, type HTMLAttributes } from "react";
import {
  type UseHitsProps,
  useHits,
  Highlight,
  Hits,
} from "react-instantsearch";
import { Grid } from "../app-ui/Grid";
import { Hit as AlgoliaHit } from "instantsearch.js";

// import { H5 } from "~/components/Heading";
// import { SponsoredCard } from "~/components/SponsoredCard";
// import { ToolRecord } from "~/components/records/ToolRecord";
// import type { SponsoringOne, ToolOne } from "~/services.server/api";

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({ hit }: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label" />
      <span className="Hit-price">{hit.name}</span>
    </>
  );
}

export function Listing() {
  return (
    <Grid>
      {/* {hits.map((hit: any) => (
        <Fragment key={hit.id}>
          {Math.min(2, hits.length - 1) === order && (
            <SponsoredCard sponsoring={sponsoring} />
          )}

          <ToolRecord
            tool={hit}
            onClick={() => sendEvent("click", hit, "Hit Clicked")}
            onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
            style={{ order }}
          />
        </Fragment>
      ))} */}
      <Hits hitComponent={Hit} />
    </Grid>
  );
}
