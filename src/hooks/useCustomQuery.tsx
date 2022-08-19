import { useQuery } from 'react-query'
import { DocumentNode } from 'graphql'
import { useSession } from 'next-auth/react'
import { graphqlClient } from 'lib/queryClient'

export const useCustomQuery = <QueryType,>(
  QUERY: DocumentNode,
  name: string,
  variables?: Record<string, any> | undefined
) => {
  const { data } = useSession()

  return useQuery(name, async () =>
    graphqlClient()
      .setHeader('Authorization', `Bearer ${data?.accessToken}`)
      .request<QueryType>(QUERY, variables)
  )
}
