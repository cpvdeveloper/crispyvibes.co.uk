import React from 'react'
import Layout from '../components/Layout'
import CoffeeAddForm from '../components/CoffeeAddForm'

function CoffeeAdd({ location }) {
  return (
    <Layout location={location}>
      <CoffeeAddForm />
    </Layout>
  )
}

export default CoffeeAdd
