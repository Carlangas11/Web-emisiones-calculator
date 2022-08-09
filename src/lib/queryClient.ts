import { QueryClient } from 'react-query'
import { GraphQLClient } from 'graphql-request'

const graphqlUrl = `${process.env.NEXT_PUBLIC_API_URL}/graphql` ?? ''

export const graphqlClient = () => {
  const client = new GraphQLClient(graphqlUrl)

  return client
}

export const queryClient = new QueryClient()
