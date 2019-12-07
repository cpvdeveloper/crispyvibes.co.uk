import React from 'react'
import { HeaderLink } from './HeaderLink'
import PropTypes from 'prop-types'
import css from './Header.module.css'

const navItems = [
  { title: 'Home', pathname: '/' },
  { title: 'Coffee', pathname: '/coffee' },
  { title: 'My Blog', pathname: '/my-blog' },
  { title: 'Tech Blog', pathname: '/tech-blog' },
  { title: 'Code', pathname: '/code' },
]

const Header = ({ location }) => {
  return (
    <header className={css.header}>
      <nav className={css.nav}>
        {navItems.map(({ pathname, title }) => (
          <HeaderLink
            key={pathname}
            to={pathname}
            title={title}
            isActive={location.pathname === pathname}
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
