import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { GetStaticProps, NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import nextI18NextConfig from '@root/next-i18next.config.js'
import { useTranslation } from 'next-i18next'

const Index: NextPage = () => {
  const { data: session } = useSession()
  const { t } = useTranslation('signIn')
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async ({ email, password }) => {
      setLoading(true)

      await signIn('sign-in', {
        email,
        password,
        redirect: false
      })

      setLoading(false)
    }
  })

  useEffect((): void => {
    if (!session || !session.user) return

    router.replace('/')
  }, [router, session])

  return (
    <Flex mt={'18px'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isRequired>
          <FormLabel color={'#6e6e6e'}>{t('email')}</FormLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={t('enterEmail')}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl mt={6} isRequired>
          <FormLabel color={'#6e6e6e'}>{t('password')}</FormLabel>

          <Input
            pr="4.5rem"
            id="password"
            name="password"
            type={'password'}
            placeholder={t('enterPassword')}
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </FormControl>
        <Button
          colorScheme="blue"
          width="full"
          mt={4}
          isLoading={loading}
          type="submit">
          Inicia sesión
        </Button>
      </form>
    </Flex>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'lateralMenu', 'signIn'],
        nextI18NextConfig
      ))
    }
  }
}

export default Index
