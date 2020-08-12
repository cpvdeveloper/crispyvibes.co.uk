require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `cpv`,
    description: `Personal site`,
    author: `Chris`,
    profiles: {
      github: `https://github.com/cpv123`,
      medium: `https://medium.com/@cp.vibert`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-embed-gist`,
            username: `cpv123`,
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tech-blog`,
        path: `${__dirname}/content/tech-blog`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/favicon-32x32.png`,
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `BlogPosts`,
        fieldName: `hasuraBlogPosts`,
        url: `${process.env.GATSBY_HASURA_GRAPHQL_URL}`,
        headers: {
          'X-Hasura-Admin-Secret': process.env.GATSBY_HASURA_ADMIN_SECRET,
          'Hasura-Client-Name': 'my-site',
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
}
