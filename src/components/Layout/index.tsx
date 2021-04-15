import React from 'react'
import { ReactNode } from 'react'
import { PageProps } from 'gatsby'
import Header from '../Header'
import css from './Layout.module.css'
import 'typeface-montserrat'

type Props = {
  location: PageProps['location']
  children: ReactNode
}

export default function Layout({ children, location }: Props) {
  return (
    <>
      <Header location={location} />
      <div className={css.content}>
        <main className={css.main}>{children}</main>
      </div>
    </>
  )
}
