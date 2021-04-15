require('./src/styles/global.css')
const React = require('react')
const { ApolloProvider } = require('./src/libs/apollo')

exports.wrapRootElement = ({ element }) => {
  return <ApolloProvider>{element}</ApolloProvider>
}
