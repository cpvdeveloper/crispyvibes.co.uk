import React from 'react'
import { graphql, PageProps } from 'gatsby'
import PostSummary from '../components/PostSummary'
import Layout from '../components/Layout'

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
    <Layout
      location={location}
      meta={{
        description:
          'Blog posts on web development. React, Next.js, GraphQL, AWS.',
      }}
    >
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

export const postsQueryFragment = graphql`
  fragment PostSummaryFragment on MarkdownRemarkEdge {
    node {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date
        title
        description
        length
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        ...PostSummaryFragment
      }
    }
  }
`
