import { useMutation } from 'react-query'
import { DocumentNode } from 'graphql'
import { useSession } from 'next-auth/react'
import { graphqlClient } from 'lib/queryClient'

export const useCustomMutation = <QueryType,>(
  MUTATION: DocumentNode,
  name: string
) => {
  const { data } = useSession()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation(name, async (variables: Record<string, any> | undefined) =>
    graphqlClient()
      .setHeader('Authorization', `Bearer ${data?.accessToken}`)
      .request<QueryType>(MUTATION, variables)
  )
}
