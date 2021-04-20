const path = require(`path`)
const axios = require('axios')
const { createFilePath } = require(`gatsby-source-filesystem`)
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/BlogPost/index.tsx`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.allMarkdownRemark.edges

  posts.forEach(post => {
    createPage({
      path: `writing${post.node.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
      },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const getCoffeeShops = async () => {
  const shops = await axios.get(`${process.env.GATSBY_COFFEE_SHOPS_URL}/shops`)
  return JSON.parse(shops.data.body).Items
}

const pageNeedsCoffee = path => {
  const PAGES = ['/coffee', '/coffee/', '/']
  if (PAGES.includes(path)) {
    return true
  }
  return false
}

exports.onCreatePage = async ({ page, actions }) => {
  if (pageNeedsCoffee(page.path)) {
    const { createPage, deletePage } = actions
    deletePage(page)

    const coffeeShops = await getCoffeeShops()

    createPage({
      ...page,
      context: {
        ...page.context,
        coffeeShops,
      },
    })
  }
}
