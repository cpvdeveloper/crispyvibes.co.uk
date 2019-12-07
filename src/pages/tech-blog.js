import React from 'react'
import { graphql } from 'gatsby'
import { useProfilesQuery } from '../hooks/useSocialQuery'
import { Link } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Bio from '../components/Bio'

const TechBlogPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges
  const { medium } = useProfilesQuery()

  return (
    <Layout location={location}>
      <SEO title="Tech" />
      <Bio bioLink={medium} bioText="Tech blog" />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <div key={node.fields.slug} style={{ marginBottom: '3rem' }}>
            <header>
              <h3 style={{ marginBottom: '0.5rem' }}>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date} • {node.frontmatter.length} read
              </small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </div>
        )
      })}
    </Layout>
  )
}

export default TechBlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            length
          }
        }
      }
    }
  }
`
