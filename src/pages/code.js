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
      <ul>
        <li>
          <a href="https://github.com/cpv123">GitHub</a>
        </li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/githubgo/paojlcepodlafkpoecligghmbhjcmdhk">
            Chrome extension: GitHubGo
          </a>
        </li>
        <li>
          <a href="https://chrome.google.com/webstore/detail/group-tabs/ohlcbhmckgkgegknphdfhoopdacaplbm">
            Chrome extension: Group Tabs
          </a>
        </li>
      </ul>
    </Layout>
  )
}

export default CodePage
