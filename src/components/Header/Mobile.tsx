import React, { useState } from 'react'
import { Link } from 'gatsby'
import { Menu, X } from 'react-feather'
import { NavItem } from '.'
import css from './Mobile.module.css'

type Props = {
  navItems: Array<NavItem>
  currentPathTitle: string
}

export default function MobileHeader({ navItems, currentPathTitle }: Props) {
  const [expanded, setExpanded] = useState(false)
  return (
    <header className={css.mobileHeader}>
      <div className={css.collapsedContent}>
        <button
          className={css.openButton}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <X /> : <Menu />}
        </button>
        <h3 className={css.pageTitle}>{currentPathTitle}</h3>
      </div>
      <div className={css.headerContent}>
        {expanded && (
          <ul className={css.navItemsList}>
            {navItems.map(({ title, emoji, pathname }) => (
              <li className={css.navItemLink}>
                <Link to={pathname}>
                  <span className={css.linkEmoji}>{emoji}</span> {title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  )
}
