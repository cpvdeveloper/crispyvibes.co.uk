import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import CoffeeShop from '../components/CoffeeShop'
import CoffeeShopsNav from '../components/CoffeeShopsNav'

function CoffeePage({ location }) {
  const [shops, setShops] = useState([])
  const [shopsLoading, setShopsLoading] = useState(true)
  const [shopsError, setShopsError] = useState(false)
  const [areShopsFiltered, setAreShopsFiltered] = useState(false)
  const [locationFilter, setLocationFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const shops = await axios.get(process.env.COFFEE_SHOPS_URL)
        setShops(shops.data.Items)
      } catch (err) {
        setShopsError(true)
      } finally {
        setShopsLoading(false)
      }
    }
    fetchShops()
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

  return (
    <Layout location={location}>
      <SEO title="Coffee" description="List of coffee shops" />
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
    </Layout>
  )
}

export default CoffeePage
