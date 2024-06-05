"use client";

import { PanelBottomCloseIcon, PanelBottomOpenIcon } from "lucide-react";
import { useInstantSearch } from "react-instantsearch";
import { cx } from "@/lib/cva";
import { HitsPerPage } from "./HitsPerPage";
import { Refinements } from "./Refinements";
import { SearchBox } from "./SearchBox";
import { SortBy } from "./SortBy";
import { Button } from "../app-ui/Button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState } from "react";

export const Filters = () => {
  const { isMobile } = useMediaQuery();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const { results } = useInstantSearch();

  const sortByItems = [
    { value: "openalternative", label: "Relevance" },
    { value: "openalternative_created_desc", label: "Latest" },
    { value: "openalternative_name_asc", label: "Name" },
    { value: "openalternative_stars_desc", label: "Stars" },
    { value: "openalternative_forks_desc", label: "Forks" },
    { value: "openalternative_lastcommit_desc", label: "Last Commit" },
  ];

  const hitsPerPageItems = [
    { value: 8, label: "9 per page", default: isMobile },
    { value: 17, label: "18 per page", default: isMobile },
    { value: 35, label: "36 per page", default: !isMobile },
    { value: 71, label: "72 per page" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div
        className={cx("flex w-full flex-wrap gap-x-2 gap-y-3 md:flex-nowrap")}
      >
        <Button
          type="button"
          size="md"
          variant="secondary"
          prefix={
            isFiltersOpen ? <PanelBottomOpenIcon /> : <PanelBottomCloseIcon />
          }
          onClick={() => setIsFiltersOpen((prev) => !prev)}
          className="flex-1 justify-start text-start"
        >
          {isFiltersOpen ? "Hide" : "Show"} Filters
        </Button>

        <SortBy items={sortByItems} className="flex-1" />
        <HitsPerPage
          items={hitsPerPageItems}
          className="max-sm:hidden sm:flex-1"
        />
        <SearchBox className="w-full" />
      </div>

      {isFiltersOpen && (
        <>
          <Refinements />

          <div className="flex items-center justify-between gap-4 text-xs text-secondary">
            <p>
              Found{" "}
              <strong className="font-medium text-foreground">
                {results?.nbHits}
              </strong>{" "}
              results in {results?.processingTimeMS}ms
            </p>
          </div>
        </>
      )}
    </div>
  );
};
