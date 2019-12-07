import React from 'react'
import PropTypes from 'prop-types'
import Header from '../Header'
import 'typeface-montserrat'
import './layout.css'

function Layout({ children, location }) {
  return (
    <>
      <div className="layoutMainContainer">
        <Header location={location} />
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
}

export { Layout }
