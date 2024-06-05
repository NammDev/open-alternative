"use client";

import React from "react";
import { InstantSearchNext } from "react-instantsearch-nextjs";
import { useRef } from "react";
import { SearchBox, Hits, DynamicWidgets } from "react-instantsearch";
import { searchClient } from "@/lib/algolia";
import { Filters } from "./home/Filters";
import { Listing } from "./home/Listing";
import { Pagination } from "./home/Pagination";

export default function SearchNext() {
  const listingRef = useRef<HTMLDivElement>(null);

  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName="open_alternative"
      routing={{
        router: {
          cleanUrlOnDispose: false,
        },
      }}
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      <div ref={listingRef} className="flex scroll-mt-14 flex-col gap-6">
        {/* <Filters /> */}
        <Listing />
      </div>

      {/* <Pagination listingRef={listingRef} padding={2} /> */}
    </InstantSearchNext>
  );
}
