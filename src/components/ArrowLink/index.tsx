import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import css from './index.module.css'

type ArrowDirections = 'left' | 'right'

type Props = {
  linkTo: string
  direction: ArrowDirections
  children: ReactNode
  gutterBottom?: boolean
}

export default function ArrowLink({
  linkTo,
  direction,
  children,
  gutterBottom = false,
}: Props) {
  const renderLinkContent = () => {
    if (direction === 'left') {
      return <>&larr;&nbsp;{children}</>
    }
    return <>{children}&nbsp;&rarr;</>
  }
  return (
    <Link
      className={classnames(css.arrow, {
        [css.gutterBottom]: gutterBottom,
      })}
      to={linkTo}
    >
      {renderLinkContent()}
    </Link>
  )
}
