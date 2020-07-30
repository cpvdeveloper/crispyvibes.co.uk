import React from 'react'

const ExternalBlogPostItem = ({ title, url }) => (
  <h3 style={{ marginBottom: '0.5rem' }}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h3>
)

export default ExternalBlogPostItem
