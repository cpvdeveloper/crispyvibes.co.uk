import React from 'react'
import { PageProps } from 'gatsby'
import { Link } from 'gatsby'
import classnames from 'classnames'
import css from './Header.module.css'

const navItems = [
  { title: 'Writing', pathname: '/writing' },
  { title: 'Coffee', pathname: '/coffee' },
]

type Props = {
  location: PageProps['location']
}

export default function Header({ location }: Props) {
  const isLinkActive = (pathname: string) => {
    return (
      location.pathname === pathname || location.pathname === `${pathname}/`
    )
  }

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        {navItems.map(({ pathname, title }) => {
          const linkTextClass = classnames(css.link, {
            [css.activeLink]: isLinkActive(pathname),
          })
          return (
            <Link key={pathname} to={pathname} className={linkTextClass}>
              {title}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
