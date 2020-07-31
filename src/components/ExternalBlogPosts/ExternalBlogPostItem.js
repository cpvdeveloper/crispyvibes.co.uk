import React from 'react'

const ExternalBlogPostItem = ({ title, url }) => (
  <h3 style={{ marginBottom: '1.5rem' }}>
    <a href={url} target="_blank" rel="noopener noreferrer">
      {title}
    </a>
  </h3>
)

export default ExternalBlogPostItem
