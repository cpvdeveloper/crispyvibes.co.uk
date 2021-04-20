import React from 'react'
import classnames from 'classnames'
import StarRating from '../StarRating'
import css from './CoffeeShop.module.css'

type Props = {
  shop: {
    name: string
    location: string
    rating: number
  }
  compact?: boolean
}

export default function CoffeeShop({ shop, compact = false }: Props) {
  return (
    <h4
      className={classnames(css.coffeeShopHeader, {
        [css.compact]: compact,
      })}
    >
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
