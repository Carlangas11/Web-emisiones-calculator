import { Box, Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { memo } from 'react'
import nextI18NextConfig from '@root/next-i18next.config.js'

const UserInforation: NextPage = () => {
  const { user } = useLoggedUserData(true)

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Box w={'70%'}>{user?.email}</Box>
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
        ['navbar', 'index', 'common', 'lateralMenu'],
        nextI18NextConfig
      ))
    }
  }
}

export default memo(UserInforation)
