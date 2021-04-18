import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import CoffeeAddForm from '../components/CoffeeAddForm'

function CoffeeAdd({ location }: { location: PageProps['location'] }) {
  return (
    <Layout location={location}>
      <CoffeeAddForm />
    </Layout>
  )
}

export default CoffeeAdd
