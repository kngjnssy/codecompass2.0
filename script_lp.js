const { GraphQLClient } = require('graphql-request')
 
async function main() {
  const endpoint = 'https://api.app.code.berlin/graphql'
 
  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjazBvNTkzNXAwNjc2bno3MjRqNTFicjdqIiwiaWF0IjoxNTkzNDUxNjIzLCJleHAiOjE1OTM0NTIyMjMsImF1ZCI6ImNvZGVycyIsImlzcyI6ImNvZGUtaW50cmFuZXQifQ.lgp6WnVNo06LN4nbcK5cFLjF8fPqB0wSkwYVPDRSPds',
    },
  })

const query = `{
  events(first:10) {
    title,
  }
}`

// const query = `{
//   events {
//     title,
//   }
// }`
 
  const data = await graphQLClient.request(query)
  // console.log(JSON.stringify(data, undefined, 2))
  console.log(data)
  // console.log(data.events[4132])
}
 
main().catch((error) => console.error(error))

