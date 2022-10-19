import { Button, Flex, Text } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import nextI18NextConfig from '@root/next-i18next.config.js'
import { useTranslation } from 'next-i18next'

import { useCustomQuery } from 'hooks/useCustomQuery'
import { GET_REPORTS } from './graphql'
import { useRouter } from 'next/router'
import { ReportsType } from './types'

const Indicators: NextPage = () => {
  useLoggedUserData(true)
  const { t } = useTranslation('indicators')
  const [reports, setReports] = useState<ReportsType[] | undefined>()
  const router = useRouter()

  const { data } = useCustomQuery<{ getReports: ReportsType[] }>(
    GET_REPORTS,
    'getReports'
  )

  useEffect(() => {
    if (data) setReports(data.getReports)
  }, [data])

  const HandleDetail = (id: string) => {
    router.push(`/indicators/graph?id=${id}`)
  }
  const goToQuery = () => {
    return (
      <Flex direction={'column'} w={'60%'} mx={'auto'}>
        {reports?.map(report => (
          <Button
            key={report.id}
            my={'14px'}
            onClick={() => HandleDetail(report.id)}>
            {report.name}
          </Button>
        ))}
      </Flex>
    )
  }

  return (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Flex w={'70%'} direction={'column'}>
        <Text fontWeight={700} fontSize={'36px'} lineHeight={'48px'}>
          {t('indicatorsTitle')} 
        </Text>
        {goToQuery()}
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'index', 'common', 'lateralMenu', 'indicators'],
        nextI18NextConfig
      ))
    }
  }
}

export default Indicators
