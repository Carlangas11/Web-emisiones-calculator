import { User } from 'models/User'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { SESSION } from 'pages/auth/graphql'
import { useEffect, useState } from 'react'
import { useCustomLazyQuery } from './useCustomLazyQuery'

type ReturnTypes = {
  user: User | undefined
  updateUserData: () => void
  isFetching: boolean
}

export const useLoggedUserData = (protectRoute?: boolean): ReturnTypes => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [user, setUser] = useState<User | undefined>(undefined)
  const { refetch, isFetching } = useCustomLazyQuery<{ session: User }>(
    SESSION,
    'session'
  )

  const updateUserData = () => {
    refetch()
      .then(async res => {
        setUser(res?.data?.session)

        if ((res?.error as string)?.toString()?.includes('Unauthorized')) {
          await signOut()
          setUser(undefined)
        }
      })
      .catch(async () => {
        await signOut()
        setUser(undefined)
      })
  }

  useEffect(() => {
    if (session?.accessToken) updateUserData()
    else setUser(undefined)
  }, [session, refetch])

  useEffect(() => {
    if (!isFetching && status === 'unauthenticated' && protectRoute)
      router.push(
        `/auth/signin${
          router.asPath !== '/auth/signin'
            ? `?callbackUrl=${router.asPath}`
            : ''
        }`
      )
  }, [status, protectRoute, router])

  return { user, updateUserData, isFetching }
}
