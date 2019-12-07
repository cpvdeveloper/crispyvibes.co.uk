import React from 'react'
import { useProfilesQuery } from '../hooks/useSocialQuery'
import Layout from '../components/Layout'
import Bio from '../components/Bio'
import SEO from '../components/SEO'

const CodePage = ({ location }) => {
  const { github } = useProfilesQuery()

  return (
    <Layout location={location}>
      <SEO title="Code" />
      <Bio bioLink={github} bioText="Some code" />
    </Layout>
  )
}

export default CodePage
