import React from 'react'
import css from './index.module.css'

export function WebsiteMigrationNotice() {
  return (
    <div className={css.container}>
      <h3 className={css.heading}>Don't judge this book by its cover</h3>
      <p style={{ marginBottom: 0 }}>
        This website is currently being migrated from Gatsby to{' '}
        <span>{`{{ ??? }}`}</span>
      </p>
      <p>Probably Next.js, but maybe I'll try something new...</p>
      <h5 className={css.subheading}>Why the migration?</h5>
      <ul>
        <li>Myself and Gatsby just never really clicked</li>
        <li>It's 2022 so I should probably oh have dark mode</li>
        <li>An opportunity to try some new things</li>
      </ul>
    </div>
  )
}
