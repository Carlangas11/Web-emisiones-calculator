import { Text, Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { memo } from 'react'
import nextI18NextConfig from '@root/next-i18next.config.js'
import MainContainerUI from '@components/MainContainerUI'
import { useTranslation } from 'next-i18next'

const UserInforation: NextPage = () => {
  const { user } = useLoggedUserData(true)
  const { t } = useTranslation('userInformation')

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-evenly'}>
      <LaterlMenu />
      <MainContainerUI title={t('title')}>
        <Text>{user?.email}</Text>
      </MainContainerUI>
    </Flex>
  )

  return (
    <Flex w={'full'} justify={'center'}>
      {renderUserLanding()}
    </Flex>
  )
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'index', 'common', 'lateralMenu', 'userInformation'],
        nextI18NextConfig
      ))
    }
  }
}

export default memo(UserInforation)
