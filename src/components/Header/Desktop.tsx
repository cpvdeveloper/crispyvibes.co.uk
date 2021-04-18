import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import { NavItem } from '.'
import css from './Desktop.module.css'

type Props = {
  navItems: Array<NavItem>
  isLinkActive: (pathname: string) => boolean
}

export default function DesktopHeader({ navItems, isLinkActive }: Props) {
  return (
    <header className={css.desktopHeader}>
      <nav className={css.nav}>
        {navItems.map(({ pathname, title, emoji }) => {
          const linkTextClass = classnames(css.link, {
            [css.activeLink]: isLinkActive(pathname),
          })
          return (
            <Link key={pathname} to={pathname} className={linkTextClass}>
              <span className={css.linkEmoji}>{emoji}</span> {title}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
