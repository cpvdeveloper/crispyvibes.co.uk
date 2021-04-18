import React from 'react'
import StarRating from '../StarRating'
import css from './CoffeeShop.module.css'

type Props = {
  shop: {
    name: string
    location: string
    rating: number
  }
}

export default function CoffeeShop({ shop }: Props) {
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
