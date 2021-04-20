import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import HeadingWithLink from '../components/HeadingWithLink'
import PostSummary from '../components/PostSummary'
import CoffeeShop from '../components/CoffeeShop'

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

type CoffeeShop = {
  name: string
  location: string
  rating: number
  createdAt: number
}

type Props = {
  location: PageProps['location']
  data: PageQueryData
  pageContext: {
    coffeeShops: Array<CoffeeShop>
  }
}

export default function HomePage({ location, data, pageContext }: Props) {
  const { edges: topThreePosts } = data.allMarkdownRemark
  const recentCoffee = pageContext.coffeeShops
    .filter(shop => shop.location === 'Bangkok')
    .slice(3, 6)
  return (
    <Layout location={location}>
      <SEO title="Home" />
      <h1>Hey, I'm Chris</h1>
      <p style={{ marginBottom: '3rem', fontWeight: 600 }}>
        Coffee recommendations and some thoughts on software development.
      </p>
      <div style={{ marginBottom: '2rem' }}>
        <HeadingWithLink
          heading="Recent coffee"
          linkTo="/coffee"
          linkText="View all"
        />
        {recentCoffee.map(shop => (
          <CoffeeShop key={shop.name} shop={shop} compact />
        ))}
      </div>
      <HeadingWithLink
        heading="Recent thoughts"
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
            compact
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
