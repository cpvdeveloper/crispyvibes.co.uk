import React from 'react'
import { SkillLevel, SkillColors } from './config'
import css from './Legend.module.css'

const legendKeys: { [level in SkillLevel]: string } = {
  expert: 'All good here',
  ok: 'Might need some Stack Overflow help',
  learning: "Don't hire me to do this just yet",
}

export default function Legend() {
  return (
    <div className={css.container}>
      {Object.entries(legendKeys).map(([key, value]) => {
        return (
          <div key={key} className={css.keyWithValue}>
            <div
              className={css.colorKey}
              style={{ background: SkillColors[key] }}
            />
            <div className={css.description}>{value}</div>
          </div>
        )
      })}
    </div>
  )
}
