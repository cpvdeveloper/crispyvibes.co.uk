import React, { ReactNode } from 'react'
import ArrowLink from '../ArrowLink'
import css from './index.module.css'

type Props = {
  heading: ReactNode
  linkTo?: string
  linkText?: ReactNode
  id?: string
  hideLink?: boolean
}

export default function HeadingWithLink({
  heading,
  linkTo,
  linkText,
  id,
  hideLink = false,
}: Props) {
  return (
    <div className={css.root} id={id}>
      <h3 className={css.heading}>{heading}</h3>
      {!hideLink && (
        <ArrowLink linkTo={linkTo} direction="right">
          {linkText}
        </ArrowLink>
      )}
    </div>
  )
}
