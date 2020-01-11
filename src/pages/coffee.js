import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import CoffeeShop from '../components/CoffeeShop'
import CoffeeShopsNav from '../components/CoffeeShopsNav'

function CoffeePage({ location, pageContext }) {
  const [shops, setShops] = useState([])
  const [shopsError, setShopsError] = useState(false)
  const [areShopsFiltered, setAreShopsFiltered] = useState(false)
  const [locationFilter, setLocationFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    setShops(pageContext.coffeeShops)
  }, [])

  const locations = !shops.length
    ? []
    : shops.reduce(
        (acc, curr) => {
          if (curr.location.startsWith('London')) {
            return acc
          }

          if (!acc.includes(curr.location)) {
            acc.push(curr.location)
          }

          return acc
        },
        ['London']
      )

  const handleClickLocation = location => {
    if (location === locationFilter || location === 'All') {
      setAreShopsFiltered(false)
      setLocationFilter('')
    } else {
      setAreShopsFiltered(true)
      setLocationFilter(location)
    }
  }

  const handleSearch = input => {
    setAreShopsFiltered(true)
    setSearchFilter(input.toLowerCase())
  }

  const shopsToRender = !areShopsFiltered
    ? shops
    : shops
        .filter(shop => shop.location.includes(locationFilter))
        .filter(
          shop =>
            shop.name.toLowerCase().includes(searchFilter) ||
            shop.location.toLowerCase().includes(searchFilter)
        )

  const locationsToRender = () => {
    const sortedLocations = locations.sort()
    sortedLocations.unshift('All')
    return sortedLocations
  }

  const renderShopsList = () => (
    <>
      <h1>{shopsToRender.length} pretty good coffee shops</h1>
      <CoffeeShopsNav
        locations={locationsToRender()}
        selectedLocation={locationFilter}
        onSearch={handleSearch}
        onClickLocation={handleClickLocation}
      />
      {shopsToRender.map(shop => (
        <CoffeeShop key={shop.name} shop={shop} />
      ))}
    </>
  )

  return (
    <Layout location={location}>
      <SEO title="Coffee" description="List of coffee shops" />
      {shopsError ? <h1>Error loading shops</h1> : renderShopsList()}
    </Layout>
  )
}

export default CoffeePage
