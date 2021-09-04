import React from 'react'
import classnames from 'classnames'
import { ArrowUp, Star, ArrowDown } from 'react-feather'
import css from './index.module.css'

type Props = {
  locations: Array<string>
  onClickLocation: (location: string) => void
  onSearch: (input: string) => void
  selectedLocation: string
  onSortByRating: () => void
  shopsCount: number
  sort: 1 | -1 | null
}

export default function CoffeeShopsNav({
  locations,
  onClickLocation,
  onSearch,
  selectedLocation,
  onSortByRating,
  shopsCount,
  sort,
}: Props) {
  const renderSortIcon = () => {
    if (sort === null) return null
    return sort === 1 ? <ArrowUp size={18} /> : <ArrowDown size={18} />
  }
  return (
    <div>
      <h1 className={css.heading}>
        <span>{shopsCount}</span> pretty good coffee shops
      </h1>
      <div className={css.filterBar}>
        <input
          className={css.search}
          placeholder="Search"
          onChange={e => onSearch(e.target.value)}
        />
        <button onClick={onSortByRating} className={css.sortButton}>
          <span className={css.sortButtonText}>Sort</span> <Star size={16} />
          {renderSortIcon()}
        </button>
      </div>
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
