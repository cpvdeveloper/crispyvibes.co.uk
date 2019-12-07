import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const IndexPage = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="Home" />
    </Layout>
  )
}

export default IndexPage
