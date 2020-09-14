import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import ExternalBlogPostItem from './ExternalBlogPostItem'
import css from './ExternalBlogPosts.module.css'

const ExternalBlogPosts = () => {
  const {
    hasuraData: { blog_posts: blogPosts },
  } = useStaticQuery(graphql`
    query BlogPostsQuery {
      hasuraData {
        blog_posts {
          id
          title
          url
        }
      }
    }
  `)

  return (
    <div className={css.postsListContainer}>
      <h2>A collection of my favourite blog posts from other people</h2>
      {blogPosts.map(({ title, url }) => (
        <ExternalBlogPostItem title={title} url={url} />
      ))}
      <Link to="/other-blog-add">Add another</Link>
    </div>
  )
}

export { ExternalBlogPosts }
