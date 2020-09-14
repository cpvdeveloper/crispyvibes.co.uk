import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import ExtensionListItem from '../components/ExtensionListItem'

const DevSetup = ({ location }) => {
  const {
    hasuraData: { extensions },
  } = useStaticQuery(graphql`
    query ExtensionsQuery {
      hasuraData {
        extensions {
          id
          name
          type
          url
        }
      }
    }
  `)

  return (
    <Layout location={location}>
      <SEO title="Chrome extensions and dotfiles" />
      <div>
        <h3>Chrome</h3>
        <ul>
          {extensions
            .filter(extension => extension.type === 'chrome')
            .map(({ id, name, url }) => (
              <ExtensionListItem key={id} name={name} url={url} />
            ))}
        </ul>
      </div>
      <h3>VSCode</h3>
      <ul>
        {extensions
          .filter(extension => extension.type === 'vscode')
          .map(({ id, name }) => (
            <ExtensionListItem key={id} name={name} />
          ))}
      </ul>
    </Layout>
  )
}

export default DevSetup
