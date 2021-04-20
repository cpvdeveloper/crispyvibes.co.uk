import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import PostSummary from '../components/PostSummary'
import HeadingWithLink from '../components/HeadingWithLink'

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

export default function HomePage({ location, data }: Props) {
  const { edges: topThreePosts } = data.allMarkdownRemark
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <h1>Coming soon...</h1>
      <HeadingWithLink
        heading="Recent writing"
        linkTo="/writing"
        linkText="View all"
      />
      {topThreePosts.map(post => {
        const { frontmatter, fields } = post.node
        return (
          <PostSummary
            key={fields.slug}
            name={frontmatter.title}
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
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 3
    ) {
      edges {
        ...PostSummaryFragment
      }
    }
  }
`
