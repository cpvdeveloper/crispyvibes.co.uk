import React from 'react'
import SEO from '../components/SEO'
import Layout from '../components/Layout'

function CoffeePage({ location }) {
  // const [shops, setShops] = useState([])
  // const [shopsLoading, setShopsLoading] = useState(true)
  // const [shopsError, setShopsError] = useState(false)

  // useEffect(() => {
  // 	const fetchShops = async () => {
  // 		try {
  // 			const shops = await axios.get(
  // 				'https://etmxlmp962.execute-api.eu-west-2.amazonaws.com/test/shops'
  // 			)
  // 			setShops(shops.data.Items)
  // 		} catch (err) {
  // 			setShopsError(true)
  // 		} finally {
  // 			setShopsLoading(false)
  // 		}
  // 	}
  // 	fetchShops()
  // })

  const shopsList = [
    { name: 'test 1', location: 'London - Fulham' },
    { name: 'test 2', location: 'London - West Kensington' },
  ]

  return (
    <Layout location={location}>
      <SEO title="Coffee" description="List of coffee shops" />
      <>
        <h1>This page will be about coffee</h1>
        {shopsList.map(shop => (
          <div key={shop.name}>
            <div>{shop.name}</div>
            <div>{shop.location}</div>
          </div>
        ))}
      </>
    </Layout>
  )
}

export default CoffeePage
