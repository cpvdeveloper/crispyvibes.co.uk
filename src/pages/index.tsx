import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const IndexPage = ({ location }: { location: PageProps['location'] }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
