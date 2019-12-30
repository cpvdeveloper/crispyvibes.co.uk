import React from 'react'
import { HeaderLink } from './HeaderLink'
import PropTypes from 'prop-types'
import css from './Header.module.css'

const navItems = [
  { title: 'Home', pathname: '/' },
  { title: 'Tech Blog', pathname: '/tech-blog' },
  { title: 'Coffee', pathname: '/coffee' },
  { title: 'Code', pathname: '/code' },
  { title: 'My Blog', pathname: '/my-blog' },
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
