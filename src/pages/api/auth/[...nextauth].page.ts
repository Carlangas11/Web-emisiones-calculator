import axios, { AxiosError } from 'axios'

import NextAuth, { User } from 'next-auth'
import CredentialsProvider, {
  CredentialInput
} from 'next-auth/providers/credentials'

const secret = process.env.SECRET || 'TH151SMYJWT53CR3TK3Y155054F34ND33CUR3'

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'sign-in',
      name: 'SignIn',
      credentials: {} as Record<string, CredentialInput>,
      async authorize(credentials) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signIn`,
            {
              email: credentials.email,
              password: credentials.password
            },
            {
              headers: {
                accept: '*/*',
                'Content-Type': 'application/json'
              }
            }
          )

          return response.data
        } catch (error) {
          const err = error as AxiosError<{ data: { error: string } }>

          return { ...err?.response?.data, id: '' }
        }
      }
    })
  ],
  secret,
  session: {
    jwt: true
  },
  jwt: { secret: secret },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token = { ...token, ...user })

      return Promise.resolve(token)
    },
    session: async ({ session, token }) => {
      session.accessToken = token.access_token
      if (session) session.user = token.user as User

      return Promise.resolve(session)
    },
    signIn: async ({ user }) => {
      if (user?.error) throw new Error((user as Record<string, string>).error)

      return Promise.resolve(true)
    }
  },
  pages: { error: '/auth/signin' }
})
