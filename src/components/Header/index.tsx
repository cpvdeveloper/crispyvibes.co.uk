import React, { useMemo } from 'react'
import { PageProps } from 'gatsby'
import DesktopHeader from './Desktop'
import MobileHeader from './Mobile'

export interface NavItem {
  title: string
  pathname: string
  emoji: string
}

const navItems: Array<NavItem> = [
  { title: 'Home', pathname: '/', emoji: '🏡' },
  { title: 'Writing', pathname: '/writing', emoji: '📝' },
  { title: 'Projects', pathname: '/projects', emoji: '👨🏼‍💻' },
  { title: 'Coffee', pathname: '/coffee', emoji: '☕' },
]

type Props = {
  location: PageProps['location']
}

export default function Header({ location }: Props) {
  const currentPathTitle = useMemo(() => {
    if (location.pathname === '/') return 'Home'
    const currentNavItem = navItems
      .filter(({ pathname }) => pathname !== '/')
      .find(({ pathname }) => {
        return location.pathname.includes(pathname)
      })
    return currentNavItem?.title
  }, [location])

  const isLinkActive = (pathname: string) => {
    return (
      location.pathname === pathname || location.pathname === `${pathname}/`
    )
  }

  return (
    <>
      <DesktopHeader navItems={navItems} isLinkActive={isLinkActive} />
      <MobileHeader navItems={navItems} currentPathTitle={currentPathTitle} />
    </>
  )
}
