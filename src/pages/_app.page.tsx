import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Fragment } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout'
import { SessionProvider } from 'next-auth/react'

import theme from '../theme'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'lib/queryClient'
import { appWithTranslation } from 'next-i18next'

import 'dayjs/locale/es'
import dayjs from 'dayjs'

dayjs.locale('es')

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <SessionProvider session={pageProps.session}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider resetCSS theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ChakraProvider>
        </QueryClientProvider>
      </SessionProvider>
    </Fragment>
  )
}

export default appWithTranslation(MyApp)
