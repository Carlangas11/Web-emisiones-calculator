import { Flex, Icon, Text } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import nextI18NextConfig from '@root/next-i18next.config.js'
import LaterlMenu from '@components/LateralMenu'
import { useRouter } from 'next/router'
import { useCustomQuery } from 'hooks/useCustomQuery'
import { DELETE_REPORT, GET_REPORTS } from './graphql'
import { useEffect, useState } from 'react'
import { ReportsType } from './types'
import { useTranslation } from 'next-i18next'
import { useCustomMutation } from 'hooks/useCustomMutation'
import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import MainContainerUI from '@components/MainContainerUI'

const Reports: NextPage = () => {
  const { t } = useTranslation('reports')
  const [reports, setReports] = useState<ReportsType[] | undefined>()
  const router = useRouter()

  const { data } = useCustomQuery<{ getReports: ReportsType[] }>(
    GET_REPORTS,
    'getReports'
  )

  const { mutate } = useCustomMutation(DELETE_REPORT, 'deleteReport')

  useEffect(() => {
    if (data) setReports(data.getReports)
  }, [data])

  const handleDetail = (id: string) => {
    router.push(`/reports/detail?id=${id}`)
  }

  const handleDelete = (reportId: string) => {
    mutate(
      { id: reportId },
      {
        onSuccess: () => {
          alert(t('deletedFile'))
        },
        onError: () => {
          alert(t('errorFile'))
        }
      }
    )
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
          <Flex
            bg={'#F2F2F2'}
            w={'45%'}
            p={'16px'}
            direction={'row'}
            key={report.id}
            justify={'space-between'}
            my={'8px'}>
            <Text fontWeight={400} fontSize={'16px'} lineHeight={'19px'}>
              {report.name}
            </Text>
            <Flex gridGap={4}>
              <Icon
                as={ViewIcon}
                onClick={() => handleDetail(report.id)}
                cursor={'pointer'}
              />
              <Icon
                as={DeleteIcon}
                onClick={() => handleDelete(report.id)}
                cursor={'pointer'}
              />
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  }

  return (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <MainContainerUI title={t('reports')}>
        {/* <Text fontWeight={700} fontSize={'36px'} lineHeight={'48px'}>
          {t('reports')}
        </Text> */}
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
        ['navbar', 'index', 'common', 'lateralMenu', 'reports'],
        nextI18NextConfig
      ))
    }
  }
}

export default Reports
