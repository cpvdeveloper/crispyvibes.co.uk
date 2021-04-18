import React, { useState, useMemo } from 'react'
import { PageProps } from 'gatsby'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import CoffeeShop from '../components/CoffeeShop'
import CoffeeShopsNav from '../components/CoffeeShopsNav'

type CoffeeShop = {
  name: string
  location: string
  rating: number
}

type Props = {
  location: PageProps['location']
  pageContext: {
    coffeeShops: Array<CoffeeShop>
  }
}

function CoffeePage({ location, pageContext }: Props) {
  const [shops, setShops] = useState(pageContext.coffeeShops)
  const [areShopsFiltered, setAreShopsFiltered] = useState(false)
  const [locationFilter, setLocationFilter] = useState('')
  const [searchFilter, setSearchFilter] = useState('')
  const [sortByRating, setSortByRating] = useState<1 | -1 | null>(null)

  const locations = useMemo(() => {
    if (!shops.length) return []
    return shops.reduce(
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
  }, [shops])

  const handleClickLocation = (location: string) => {
    if (location === locationFilter || location === 'All') {
      setAreShopsFiltered(false)
      setLocationFilter('')
    } else {
      setAreShopsFiltered(true)
      setLocationFilter(location)
    }
  }

  const handleSearch = (input: string) => {
    setAreShopsFiltered(true)
    setSearchFilter(input.toLowerCase())
  }

  const handleSortByRating = () => {
    let sortedShops = []
    const sortDescending = () => {
      sortedShops = shops.sort((a, b) => b.rating - a.rating)
      setShops(sortedShops)
      setSortByRating(1)
    }
    if (!sortByRating) {
      sortDescending()
    } else if (sortByRating === 1) {
      sortedShops = shops.sort((a, b) => a.rating - b.rating)
      setShops(sortedShops)
      setSortByRating(-1)
    } else {
      sortDescending()
    }
  }

  const shopsToRender = useMemo(() => {
    if (!areShopsFiltered) return shops
    return shops
      .filter(shop => shop.location.includes(locationFilter))
      .filter(
        shop =>
          shop.name.toLowerCase().includes(searchFilter) ||
          shop.location.toLowerCase().includes(searchFilter)
      )
  }, [areShopsFiltered, searchFilter, locationFilter])

  const locationsToRender = useMemo(() => {
    const sortedLocations = locations.sort()
    sortedLocations.unshift('All')
    return sortedLocations
  }, [locations])

  const renderShopsList = () => (
    <>
      <CoffeeShopsNav
        locations={locationsToRender}
        selectedLocation={locationFilter}
        onSearch={handleSearch}
        onClickLocation={handleClickLocation}
        onSortByRating={handleSortByRating}
        shopsCount={shopsToRender.length}
        sort={sortByRating}
      />
      {shopsToRender.map(shop => (
        <CoffeeShop key={shop.name} shop={shop} />
      ))}
    </>
  )

  return (
    <Layout location={location}>
      <SEO title="Coffee" description="List of coffee shops" />
      {renderShopsList()}
    </Layout>
  )
}

export default CoffeePage
