import React from 'react'
import PropTypes from 'prop-types'
import StarRating from '../StarRating'

function CoffeeShop({ shop }) {
  return (
    <div>
      <header>
        <h4>
          {shop.name} • <small>{shop.location}</small> •{' '}
          <StarRating rating={shop.rating} />
        </h4>
      </header>
    </div>
  )
}

CoffeeShop.propTypes = {
  shop: PropTypes.shape({
    name: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
}

export { CoffeeShop }
