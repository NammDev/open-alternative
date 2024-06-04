import { type VariantProps, cva, cx } from "@/lib/cva";
import { type ElementRef, forwardRef } from "react";
import Link from "next/link";

export const navigationLinkVariants = cva({
  base: [
    "group flex items-center gap-2 p-0.5 -m-0.5 text-sm -tracking-micro cursor-pointer",
    "text-muted disabled:opacity-50 hover:text-foreground",
  ],
  variants: {
    isActive: {
      true: "font-medium text-foreground",
    },
  },
});

export interface LinkProps
  extends React.LinkHTMLAttributes<HTMLLIElement>,
    VariantProps<typeof navigationLinkVariants> {}

export const NavigationLink = forwardRef<ElementRef<typeof Link>, LinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>} // Update the type of the ref parameter
        className={cx(navigationLinkVariants({ isActive: true, className }))}
        {...props}
      />
    );
  },
);

NavigationLink.displayName = "NavigationLink";
