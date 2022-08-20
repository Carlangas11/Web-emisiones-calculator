import { DocumentNode } from 'graphql'
import { graphqlClient } from 'lib/queryClient'
import { useSession } from 'next-auth/react'
import { useQuery } from 'react-query'

export const useCustomLazyQuery = <QueryType,>(
  QUERY: DocumentNode,
  name: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variables?: Record<string, any | undefined>
) => {
  const { data } = useSession()
  return useQuery(
    name,
    async () =>
      graphqlClient()
        .setHeader('Authorization', `Bearer ${data?.accessToken}`)
        .request<QueryType>(QUERY, variables),
    {
      enabled: false,
      retry: false,
      refetchOnWindowFocus: false
    }
  )
}
