import React from 'react'
import { ReactNode } from 'react'
import { PageProps } from 'gatsby'
import SEO, { SEOProps } from '../SEO'
import Header from '../Header'
import css from './Layout.module.css'
import 'typeface-montserrat'

type Props = {
  location: PageProps['location']
  children: ReactNode
  meta?: SEOProps
}

export default function Layout({ children, location, meta }: Props) {
  return (
    <>
      <SEO {...meta} />
      <Header location={location} />
      <div className={css.content}>
        <main className={css.main}>{children}</main>
      </div>
    </>
  )
}
