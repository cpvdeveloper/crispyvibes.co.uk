import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Layout from '../../components/Layout'
import ArrowLink from '../../components/ArrowLink'

interface BlogPostQueryData {
  markdownRemark: {
    excerpt: string
    html: any
    frontmatter: {
      title: string
      date: string
      description: string
      length: number
      link: string
    }
  }
}

type Props = {
  location: PageProps['location']
  data: BlogPostQueryData
}

function BlogPostTemplate({ location, data }: Props) {
  const { frontmatter, html, excerpt } = data.markdownRemark
  const { title, description, date, length, link } = frontmatter

  return (
    <Layout
      location={location}
      meta={{ title, description: description || excerpt }}
    >
      <ArrowLink linkTo="/writing" direction="left" gutterBottom>
        Writing
      </ArrowLink>
      <article>
        <header>
          <h1>{title}</h1>
          <p>
            {date} • {length} read
          </p>
        </header>
        <hr />
        <section dangerouslySetInnerHTML={{ __html: html }} />
        <hr />
        <footer>
          <a href={link}>{link}</a>
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
