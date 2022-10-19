import { Button, Flex } from '@chakra-ui/react'
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
import MainContainerUI from '@components/MainContainerUI'

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
      <Flex
        direction={'row'}
        flexWrap={'wrap'}
        justify={'space-between'}
        w={'full'}
        gridGap={2}>
        {reports?.map(report => (
          <Button
            key={report.id}
            w={'45%'}
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
      <MainContainerUI title={t('indicatorsTitle')}>
        {goToQuery()}
      </MainContainerUI>
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
