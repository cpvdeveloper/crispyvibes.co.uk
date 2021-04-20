import React, { ReactNode } from 'react'
import ArrowLink from '../ArrowLink'
import css from './index.module.css'

type Props = {
  heading: ReactNode
  linkTo: string
  linkText: ReactNode
}

export default function HeadingWithLink({ heading, linkTo, linkText }: Props) {
  return (
    <div className={css.root}>
      <h3 className={css.heading}>{heading}</h3>
      <ArrowLink linkTo={linkTo} direction="right">
        {linkText}
      </ArrowLink>
    </div>
  )
}
