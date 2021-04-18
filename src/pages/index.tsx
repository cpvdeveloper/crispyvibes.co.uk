import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const HomePage = ({ location }: { location: PageProps['location'] }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <h1>Coming soon...</h1>
    </Layout>
  )
}

export default HomePage
