'use client'

import {
  BlocksIcon,
  BracesIcon,
  ChevronDownIcon,
  GemIcon,
  GithubIcon,
  LoaderIcon,
  MenuIcon,
  PlusIcon,
  SmilePlusIcon,
  TagIcon,
  XIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { Breadcrumb } from '../ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Link from 'next/link'

export const Header = () => {
  const [isNavOpen, setNavOpen] = useState(false)
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

  // Close the mobile navigation when the user presses the "Escape" key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNavOpen(false)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div
      className={cn(
        'sticky top-0 z-10 flex flex-wrap items-center py-3 -my-3 gap-3 backdrop-blur-sm bg-background/95 md:gap-4'
      )}
    >
      <button type='button' onClick={() => setNavOpen(!isNavOpen)} className='lg:hidden'>
        <MenuIcon className={cn('size-6 stroke-[1.5]', isNavOpen && 'hidden')} />
        <XIcon className={cn('size-6 stroke-[1.5]', !isNavOpen && 'hidden')} />
        <span className='sr-only'>Toggle navigation</span>
      </button>

      <Breadcrumb className='mr-auto' />

      <nav className='contents max-lg:hidden'>
        <DropdownMenu>
          <DropdownMenuTrigger className='gap-1'>
            Browse <ChevronDownIcon />
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem asChild>
              <Link href='/latest'>
                <GemIcon className='size-4 opacity-75' /> Latest
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/categories'>
                <BlocksIcon className='size-4 opacity-75' /> Categories
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/alternatives'>
                <SmilePlusIcon className='size-4 opacity-75' /> Alternatives
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/languages'>
                <BracesIcon className='size-4 opacity-75' /> Languages
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href='/topics'>
                <TagIcon className='size-4 opacity-75' /> Topics
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link href='/about'>About</Link>
        <Link href='/sponsor'>Sponsor</Link>
      </nav>
      {/* 
      <Series size='sm'>
        <ClientOnly>{() => <ThemeSwitcher />}</ClientOnly>

        <Button
          size='sm'
          variant='secondary'
          prefix={<GithubIcon />}
          suffix={
            <>
              {!error && (
                <Badge size='sm' className='-my-0.5 size-auto'>
                  {isLoading && <LoaderIcon className='size-3 animate-spin' />}
                  {data && formatter.format(data)}
                </Badge>
              )}
            </>
          }
          asChild
        >
          <a href={GITHUB_URL} target='_blank' rel='nofollow noreferrer'>
            Star
            <Ping className='absolute -top-1 -right-1' />
          </a>
        </Button>

        <Button
          size='sm'
          variant='secondary'
          prefix={<PlusIcon />}
          className='-my-1.5 max-sm:hidden'
          asChild
        >
          <NavLink to='/submit' unstable_viewTransition>
            Submit
          </NavLink>
        </Button>
      </Series>

      {isNavOpen && (
        <nav className='mt-2 flex flex-col gap-y-2 w-full lg:hidden'>
          <Link href='/latest'>Latest</NavigationLink>
          <Link href='/categories'>Categories</NavigationLink>
          <NavigationLink to='/alternatives'>Alternatives</NavigationLink>
          <NavigationLink to='/languages'>Languages</NavigationLink>
          <NavigationLink to='/topics'>Topics</NavigationLink>
          <NavigationLink to='/submit'>Submit</NavigationLink>
          <NavigationLink to='/sponsor'>Sponsor</NavigationLink>
          <NavigationLink to='/about'>About</NavigationLink>
        </nav>
      )} */}
    </div>
  )
}
