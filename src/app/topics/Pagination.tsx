import { navigationLinkVariants } from "@/components/app-ui/NavigationLink";
import { PaginationLink } from "@/components/app-ui/PaginationLink";
import { cx } from "@/lib/cva";
import { getCurrentPage } from "@/lib/utils";
// import { useLocation, useSearchParams } from "@remix-run/react";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { type HTMLAttributes, useMemo } from "react";

export type PaginationProps = HTMLAttributes<HTMLElement> &
  Omit<UsePaginationProps, "currentPage">;

export const PaginationTopic = ({
  className,
  totalCount,
  pageSize = 1,
  siblingCount,
  ...props
}: PaginationProps) => {
  // const { pathname } = useLocation();
  // const [params] = useSearchParams();

  const currentPage = useMemo(
    () => getCurrentPage(params.get("page")),
    [params],
  );
  const pageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
    siblingCount,
  });

  if (paginationRange.length <= 1) {
    return null;
  }

  return (
    <nav
      className={cx(
        "-mt-px flex w-full items-start justify-between md:w-auto",
        className,
      )}
      {...props}
    >
      <PaginationLink
        href={getPageLink(params, pathname, currentPage - 1)}
        isDisabled={currentPage <= 1}
        prefix={<MoveLeftIcon />}
        rel="prev"
      >
        prev
      </PaginationLink>

      <p className="text-sm text-muted md:hidden">
        Page {currentPage} of {pageCount}
      </p>

      <div className="flex flex-wrap items-center gap-3 max-md:hidden">
        <span className="text-sm text-muted">Page:</span>

        {paginationRange.map((page, index) => (
          <div key={`page-${index}`}>
            {typeof page === "string" && (
              <span className={navigationLinkVariants()}>{page}</span>
            )}

            {typeof page === "number" && (
              <PaginationLink
                href={getPageLink(params, pathname, page)}
                isActive={currentPage === page}
                className="min-w-5 justify-center"
              >
                {page}
              </PaginationLink>
            )}
          </div>
        ))}
      </div>

      <PaginationLink
        href={getPageLink(params, pathname, currentPage + 1)}
        isDisabled={currentPage >= pageCount}
        suffix={<MoveRightIcon />}
        rel="prev"
      >
        next
      </PaginationLink>
    </nav>
  );
};
