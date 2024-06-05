import { Fragment } from "react";
import { useHits } from "react-instantsearch";
import { Grid } from "../app-ui/Grid";
import { ToolRecord } from "../app-ui/ToolRecord";

export const Listing = () => {
  const { hits, sendEvent } = useHits();

  return (
    <Grid>
      {hits.map((hit, order) => (
        <Fragment key={hit.id}>
          <ToolRecord
            tool={hit}
            onClick={() => sendEvent("click", hit, "Hit Clicked")}
            onAuxClick={() => sendEvent("click", hit, "Hit Clicked")}
            style={{ order }}
          />
        </Fragment>
      ))}

      {!hits.length && <h5>No results found</h5>}
    </Grid>
  );
};
