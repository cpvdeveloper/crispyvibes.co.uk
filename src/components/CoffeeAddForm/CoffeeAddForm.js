import React, { useState } from 'react'
import axios from 'axios'
import StarRating from '../StarRating'
import css from './CoffeeAddForm.module.css'

function CoffeeAddForm() {
  const initialForm = {
    name: '',
    location: '',
    rating: '',
    authorization: '',
    shouldTriggerDeploy: false,
  }
  const [shopDetails, setShopDetails] = useState(initialForm)
  const [fetchError, setFetchError] = useState(false)

  const resetForm = () => {
    setShopDetails(initialForm)
    setFetchError(false)
  }

  const handleInputChange = e => {
    const { name, value } = e.target
    setShopDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }))
  }

  const handleTriggerDeployChange = () => {
    setShopDetails(prevDetails => ({
      ...prevDetails,
      shouldTriggerDeploy: !prevDetails.shouldTriggerDeploy,
    }))
  }

  const handleSubmit = async () => {
    try {
      await axios.post(process.env.GATSBY_COFFEE_SHOPS_URL_OLD, {
        body: shopDetails,
      })
      resetForm()
    } catch (err) {
      setFetchError(true)
    }
  }

  return (
    <div className={css.addForm}>
      <input
        name="name"
        value={shopDetails.name}
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        name="location"
        value={shopDetails.location}
        placeholder="Location"
        onChange={handleInputChange}
      />
      <input
        name="rating"
        type="number"
        max="5"
        min="0"
        value={shopDetails.rating}
        placeholder="Rating"
        onChange={handleInputChange}
      />
      <div className={css.starRatingContainer}>
        <StarRating rating={shopDetails.rating} />
      </div>
      <input
        name="authorization"
        value={shopDetails.authorization}
        placeholder="Authorization"
        onChange={handleInputChange}
      />
      <div className={css.deployTriggerInput}>
        <span>Should trigger deploy</span>
        <input
          type="checkbox"
          value={shopDetails.shouldTriggerDeploy}
          name="shouldTriggerDeploy"
          onChange={handleTriggerDeployChange}
        />
      </div>
      <button onClick={handleSubmit}>Add shop</button>
      {fetchError && <div className={css.errorMessage}>Unable to add shop</div>}
    </div>
  )
}

export { CoffeeAddForm }
