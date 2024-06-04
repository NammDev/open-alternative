"use client";

import algoliasearch from "algoliasearch/lite";
import React from "react";
import { InstantSearchNext } from "react-instantsearch-nextjs";

import { history } from "instantsearch.js/es/lib/routers";
import { type ComponentProps, useRef } from "react";
import { Configure, InstantSearch } from "react-instantsearch";
import { searchClient } from "@/lib/algolia";
import { Listing } from "./home/Listing";
// import type { SponsoringOne } from "~/services.server/api";
// import { Filters } from "./Filters";
// import { Listing } from "./Listing";
// import { Pagination } from "./Pagination";

type SearchProps = {
  //   sponsoring: SponsoringOne | null;
};

export default function SearchNext({}: SearchProps) {
  const listingRef = useRef<HTMLDivElement>(null);
  const indexName = process.env.ALGOLIA_INDEX_NAME ?? "";

  const instantSearchOptions: ComponentProps<typeof InstantSearch> = {
    searchClient,
    indexName,
    routing: {
      router: {
        cleanUrlOnDispose: false,
      },
    },
    future: { preserveSharedStateOnUnmount: true },
  };

  return (
    <InstantSearchNext {...instantSearchOptions}>
      <Configure />

      <div ref={listingRef} className="flex scroll-mt-14 flex-col gap-6">
        {/* <Filters /> */}
        <Listing />
      </div>

      {/* <Pagination listingRef={listingRef} padding={2} /> */}
    </InstantSearchNext>
  );
}
