import { cn } from '@/lib/utils'
import Link, { LinkProps } from 'next/link'
import { type ElementRef, forwardRef } from 'react'

export const navigationLinkVariants = cn({
  base: [
    'group flex items-center gap-2 p-0.5 -m-0.5 text-sm -tracking-micro cursor-pointer',
    'text-muted disabled:opacity-50 hover:text-foreground',
  ],
  variants: {
    isActive: {
      true: 'font-medium text-foreground',
    },
  },
})

export const NavigationLink = forwardRef<ElementRef<typeof Link>, LinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={({ isActive }) => cn(navigationLinkVariants({ isActive, className }))}
        unstable_viewTransition
        {...props}
      />
    )
  }
)

NavigationLink.displayName = 'NavigationLink'
