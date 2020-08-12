import React from 'react'
import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from '@apollo/client'

const CLIENT_URI = process.env.GATSBY_HASURA_GRAPHQL_URL
const HASURA_ADMIN = process.env.GATSBY_HASURA_ADMIN_SECRET

const httpLink = new HttpLink({ uri: CLIENT_URI })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'X-Hasura-Admin-Secret': HASURA_ADMIN,
    },
  }))

  return forward(operation)
})

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authMiddleware, httpLink]),
})

export const ApolloProvider = ({ children }) => (
  <Provider client={apolloClient}>{children}</Provider>
)
