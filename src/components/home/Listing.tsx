import { Fragment, HTMLAttributes } from "react";
import { useHits } from "react-instantsearch";
import { Grid } from "../app-ui/Grid";
import { ToolRecord } from "../app-ui/ToolRecord";
import { H5 } from "../app-ui/Heading";

export const Listing = () => {
  const { hits, sendEvent } = useHits();

  return (
    <Grid>
      {hits.map((hit, order) => (
        <Fragment key={hit.id}>
          {/* {Math.min(2, hits.length - 1) === order && (
            <SponsoredCard sponsoring={sponsoring} />
          )} */}

          <ToolRecord
            tool={hit}
            onClick={() => sendEvent("click", hit, "Hit Clicked")}
            onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
            style={{ order }}
          />
        </Fragment>
      ))}

      {!hits.length && <H5>No results found</H5>}
    </Grid>
  );
};
