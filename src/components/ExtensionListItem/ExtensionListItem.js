import React from 'react'
import css from './ExtensionListItem.module.css'

const ExtensionListItem = ({ name, url }) => (
  <li className={css.item}>
    <a href={url} target="_blank" rel="noreferrer noopener">
      {name}
    </a>
  </li>
)

export { ExtensionListItem }
