import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SessionProvider } from 'next-auth/react'

import theme from '../theme'

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <SessionProvider session={pageProps.session}>
        {/* <QueryClientProvider client={queryClient}> */}
        <ChakraProvider resetCSS theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </QueryClientProvider> */}
        </ChakraProvider>
      </SessionProvider>
    </Fragment>
  )
}

export default MyApp
