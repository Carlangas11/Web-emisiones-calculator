import { Button, Flex } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '@root/next-i18next.config.js'
import LaterlMenu from '@components/LateralMenu'
import { useRouter } from 'next/router'
import { useCustomQuery } from 'hooks/useCustomQuery'
import { GET_REPORTS } from './graphql'
import { useEffect, useState } from 'react'
import { ReportsType } from './types'

const Reports: NextPage = () => {
  const [reports, setReports] = useState<ReportsType[] | undefined>()
  const router = useRouter()

  const { data } = useCustomQuery<{ getReports: ReportsType[] }>(
    GET_REPORTS,
    'getReports'
  )

  useEffect(() => {
    if (data) setReports(data.getReports)
  }, [data])

  const handleDetail = (id: string) => {
    router.push(`/reports/detail?id=${id}`)
  }
  const goToQuery = () => {
    return (
      <Flex direction={'column'} w={'60%'} mx={'auto'}>
        {reports?.map(report => (
          <Button
            key={report.id}
            my={'14px'}
            onClick={() => handleDetail(report.id)}>
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
        ['navbar', 'index', 'common', 'lateralMenu', 'reports'],
        nextI18NextConfig
      ))
    }
  }
}

export default Reports
