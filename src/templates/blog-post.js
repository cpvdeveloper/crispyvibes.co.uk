import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/SEO'

function BlogPostTemplate({ location, data }) {
  const post = data.markdownRemark

  return (
    <Layout location={location}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1>{post.frontmatter.title}</h1>
          <p>
            {post.frontmatter.date} • {post.frontmatter.length} read
          </p>
        </header>
        <hr />
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr />
        <footer>
          <a href={post.frontmatter.link}>{post.frontmatter.link}</a>
        </footer>
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        length
        link
      }
    }
  }
`
