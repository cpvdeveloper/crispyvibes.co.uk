import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage = ({ location }: { location: PageProps['location'] }) => (
  <Layout location={location}>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
  </Layout>
)

export default NotFoundPage
