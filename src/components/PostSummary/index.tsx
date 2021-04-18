import React from 'react'
import { Link } from 'gatsby'
import css from './index.module.css'

type Props = {
  name: string
  link: string
  excerpt: string
  date: string
  readTime: number
}

export default function PostSummary({
  name,
  link,
  excerpt,
  date,
  readTime,
}: Props) {
  return (
    <div className={css.root}>
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
