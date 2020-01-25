import React from 'react'
import PropTypes from 'prop-types'
import StarRating from '../StarRating'
import css from './CoffeeShop.module.css'

function CoffeeShop({ shop }) {
  return (
    <h4 className={css.coffeeShopHeader}>
      <span className={css.shopNameLocation}>
        {shop.name} • <small>{shop.location}</small>
      </span>
      <span>
        <span className={css.ratingDot}>•</span>{' '}
        <StarRating rating={shop.rating} />
      </span>
    </h4>
  )
}

CoffeeShop.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
}

export { CoffeeShop }
