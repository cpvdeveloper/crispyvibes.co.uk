import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons'

function StarRating({ rating }) {
  const lowerLimit = rating ? Math.floor(rating) : -1
  const endsInHalf = lowerLimit > -1 && lowerLimit < rating
  const starsArray = []

  if (lowerLimit > -1) {
    for (let i = 0; i < lowerLimit; i++) {
      starsArray.push(<FontAwesomeIcon icon={faStar} size="xs" />)
    }

    if (endsInHalf) {
      starsArray.push(<FontAwesomeIcon icon={faStarHalf} size="xs" />)
    }
  }

  return starsArray
}

export { StarRating }
