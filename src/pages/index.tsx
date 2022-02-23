import React from 'react'
import { PageProps, graphql } from 'gatsby'
import Layout from '../components/Layout'
import Skills from '../components/Skills'
import Intro from '../components/Intro'
import HeadingWithLink from '../components/HeadingWithLink'
import PostSummary from '../components/PostSummary'
import CoffeeShop from '../components/CoffeeShop'
import { WebsiteMigrationNotice } from '../components/WebsiteMigrationNotice'

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
  const recentCoffee = pageContext.coffeeShops.slice(0, 3)
  return (
    <Layout location={location}>
      <Intro />
      <div style={{ marginBottom: '2rem' }}>
        {/* <HeadingWithLink heading="Things I can do" hideLink /> */}
        <Skills />
      </div>
      <WebsiteMigrationNotice />
      <HeadingWithLink
        id="blog-summary"
        heading="Some recent thoughts"
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
      <div style={{ marginTop: '2rem' }}>
        <HeadingWithLink
          id="coffee-summary"
          heading="Some recent coffee"
          linkTo="/coffee"
          linkText="View all"
        />
        {recentCoffee.map(shop => (
          <CoffeeShop key={shop.name} shop={shop} compact />
        ))}
      </div>
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
