import React from 'react'
import { HeaderLink } from './HeaderLink'
import PropTypes from 'prop-types'
import css from './Header.module.css'

const navItems = [
  { title: 'Writing', pathname: '/writing' },
  { title: 'Coffee', pathname: '/coffee' },
]

const Header = ({ location }) => {
  const isLinkActive = pathname => {
    return (
      location.pathname === pathname || location.pathname === `${pathname}/`
    )
  }

  return (
    <header className={css.header}>
      <nav className={css.nav}>
        {navItems.map(({ pathname, title }) => (
          <HeaderLink
            key={pathname}
            to={pathname}
            title={title}
            isActive={isLinkActive(pathname)}
          />
        ))}
      </nav>
    </header>
  )
}

Header.propTypes = {
  location: PropTypes.object.isRequired,
}

export { Header }
