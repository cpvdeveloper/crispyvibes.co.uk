import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './CoffeeShopsNav.module.css'

function CoffeeShopsNav({
  locations,
  onClickLocation,
  onSearch,
  selectedLocation,
  onSortByRating,
}) {
  return (
    <div>
      <input
        className={css.search}
        placeholder="Search"
        onChange={e => onSearch(e.target.value)}
      />
      <button onClick={onSortByRating}>Sort by rating</button>
      <nav>
        <ul className={css.list}>
          {locations.map(location => (
            <li key={location} className={css.listItem}>
              <button
                className={classnames(css.item, {
                  [css.selectedItem]: location === selectedLocation,
                })}
                onClick={() => onClickLocation(location)}
              >
                {location}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

CoffeeShopsNav.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickLocation: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  selectedLocation: PropTypes.string.isRequired,
}

export { CoffeeShopsNav }
