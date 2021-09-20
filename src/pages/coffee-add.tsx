import React from 'react'
import { PageProps } from 'gatsby'
import Layout from '../components/Layout'
import { make as CoffeeAddForm } from '../rescript/CoffeeAddForm/CoffeeAddForm.bs.js'

function CoffeeAdd({ location }: { location: PageProps['location'] }) {
  return (
    <Layout location={location}>
      <CoffeeAddForm />
    </Layout>
  )
}

export default CoffeeAdd
