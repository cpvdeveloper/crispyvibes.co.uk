import React from 'react'
import { graphql, PageProps } from 'gatsby'
import PostSummary from '../components/PostSummary'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

interface PageQueryData {
  allMarkdownRemark: {
    edges: Array<{
      node: {
        excerpt: string
        fields: {
          slug: string
        }
        frontmatter: {
          date: string
          title: string
          description: string
          length: number
        }
      }
    }>
  }
}

type Props = {
  location: PageProps['location']
  data: PageQueryData
}

export default function TechBlogPage({ location, data }: Props) {
  const { edges: posts } = data.allMarkdownRemark

  return (
    <Layout location={location}>
      <SEO title="Tech blog" />
      {posts.map(({ node: { frontmatter, fields } }) => {
        return (
          <PostSummary
            name={frontmatter.title || fields.slug}
            link={fields.slug}
            excerpt={frontmatter.description}
            date={frontmatter.date}
            readTime={frontmatter.length}
          />
        )
      })}
    </Layout>
  )
}

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
