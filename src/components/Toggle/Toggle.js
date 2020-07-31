import React from 'react'
import css from './Toggle.module.css'

const Toggle = ({ toggleValue, onToggle }) => (
  <label className={css.switch}>
    <input type="checkbox" value={toggleValue} onChange={onToggle} />
    <span className={css.slider} />
  </label>
)

export { Toggle }
