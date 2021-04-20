import React, { ReactNode } from 'react'
import { Link } from 'gatsby'
import css from './index.module.css'

type ArrowDirections = 'left' | 'right'

type Props = {
  linkTo: string
  direction: ArrowDirections
  children: ReactNode
}

export default function ArrowLink({ linkTo, direction, children }: Props) {
  const renderLinkContent = () => {
    if (direction === 'left') {
      return <>&larr;&nbsp;{children}</>
    }
    return <>{children}&nbsp;&rarr;</>
  }
  return (
    <Link className={css.arrow} to={linkTo}>
      {renderLinkContent()}
    </Link>
  )
}
