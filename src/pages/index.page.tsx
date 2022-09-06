import { Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'

import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '@root/next-i18next.config.js'
// import LocaleOptions from '@components/LocaleOption'
import { useTranslation } from 'next-i18next'

const Index: NextPage = () => {
  const { t } = useTranslation('index')
  const { user } = useLoggedUserData()

  const renderLanding = () => <>{t('homeTitle')}</>

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
    </Flex>
  )

  return (
    <Flex w={'full'} justify={'center'}>
      {user ? renderUserLanding() : renderLanding()}
      {/* <LocaleOptions /> */}
    </Flex>
  )
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'index', 'common', 'lateralMenu'],
        nextI18NextConfig
      ))
    }
  }
}

export default Index
