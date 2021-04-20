import React from 'react'
import { Link } from 'gatsby'
import classnames from 'classnames'
import css from './index.module.css'

type Props = {
  name: string
  link: string
  excerpt: string
  date: string
  readTime: number
  compact?: boolean
}

export default function PostSummary({
  name,
  link,
  excerpt,
  date,
  readTime,
  compact = false,
}: Props) {
  return (
    <div
      className={classnames(css.root, {
        [css.compact]: compact,
      })}
    >
      <Link to={`/writing${link}`} className={css.title}>
        {name}
      </Link>
      <p className={css.excerpt}>{excerpt}</p>
      <small className={css.info}>
        {date} • {readTime} read
      </small>
    </div>
  )
}
