import React from 'react'
import { useProfilesQuery } from '../hooks/useSocialQuery'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Bio from '../components/Bio'

const BlogPage = ({ location }) => {
  const { medium } = useProfilesQuery()

  return (
    <Layout location={location}>
      <SEO title="Blog" />
      <Bio bioLink={medium} bioText="Personal blog" />
    </Layout>
  )
}

export default BlogPage
