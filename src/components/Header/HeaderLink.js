import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import css from './HeaderLink.module.css'

function HeaderLink({ isActive, title, to }) {
  const containerClass = classnames(css.linkContainer, {
    [css.linkContainerActive]: isActive,
  })

  const linkTextClass = classnames(css.linkText, {
    [css.linkTextActive]: isActive,
  })

  return (
    <div className={containerClass}>
      <Link to={to} className={linkTextClass}>
        {title}
      </Link>
    </div>
  )
}

export { HeaderLink }
