import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import css from './Bio.module.css'

const Bio = ({ bioLink, bioText, authorLink }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <div className={css.bioContainer}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={authorLink}
        className={css.image}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <p className={css.bioText}>
        {bioText} by <a href={bioLink}>{authorLink}</a>
      </p>
    </div>
  )
}

Bio.propTypes = {
  bioLink: PropTypes.string,
  bioText: PropTypes.string.isRequired,
  authorLink: PropTypes.string.isRequired,
}

Bio.defaultProps = {
  bioLink: 'cpv123',
}

export { Bio }
