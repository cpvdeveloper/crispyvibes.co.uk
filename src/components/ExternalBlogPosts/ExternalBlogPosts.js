import React from 'react'
import ExternalBlogPostItem from './ExternalBlogPostItem'

const posts = [{ title: 'Test', url: 'test' }]
const ExternalBlogPosts = () => (
  <div>
    {posts.map(({ title, url }) => (
      <ExternalBlogPostItem title={title} url={url} />
    ))}
  </div>
)

export { ExternalBlogPosts }
