import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useCustomLazyQuery } from 'hooks/useCustomLazyQuery'
import { GetServerSideProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GET_REPORT_ITEMS } from '../graphql'
import { ReportItemType } from './types'
import nextI18NextConfig from '@root/next-i18next.config.js'

const tableHeaders = [
  'Fuente de Consumo',
  'Subfuente de consumo',
  'Area',
  'Unidades',
  'Consumo Anual',
  'CCH Nivel 1',
  'CCH Nivel 2',
  'CCH Nivel 3',
  'CCH Nivel 4',
  'Valor del FE',
  'Unidad del FE',
  'Emisiones (kgCO2eq)'
]

const Detail = () => {
  const router = useRouter()
  const [reportItems, setReportItems] = useState<ReportItemType[] | undefined>()

  const id = router.query.id?.toString()

  const { refetch } = useCustomLazyQuery<{ getReportItems: ReportItemType[] }>(
    GET_REPORT_ITEMS,
    'getReportItems',
    {
      reportId: id
    }
  )

  useEffect(() => {
    if (id)
      refetch()
        .then(res => setReportItems(res.data?.getReportItems))
        .catch(() => setReportItems(undefined))
  }, [id])

  const renderTable = () => {
    return (
      <TableContainer overflowY={'auto'}>
        <Table variant="striped" colorScheme="blue" size={'sm'}>
          <Thead bg={'teal'}>
            <Tr>
              {tableHeaders.map((title, idx) => (
                <Th key={idx.toString()} color={'white'} textAlign={'center'}>
                  {title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {reportItems &&
              reportItems?.map((report, idx) => (
                <Tr key={idx.toString()}>
                  <Td textAlign={'center'}>{report.fuenteDeConsumo}</Td>
                  <Td textAlign={'center'}>{report.subfuenteDeConsumo}</Td>
                  <Td textAlign={'center'}>{report.costCenter}</Td>
                  <Td textAlign={'center'}>{report.consumptionUnit}</Td>
                  <Td textAlign={'center'}>{report.consumption}</Td>
                  <Td textAlign={'center'}>{report.nivel1}</Td>
                  <Td textAlign={'center'}>{report.nivel2}</Td>
                  <Td textAlign={'center'}>{report.nivel3}</Td>
                  <Td textAlign={'center'}>{report.nivel4}</Td>
                  <Td textAlign={'center'}>{report.totalFe}</Td>
                  <Td textAlign={'center'}>{report.measureUnitFe}</Td>
                  <Td textAlign={'center'}>
                    {Math.round(report.totalEmission)}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Flex w={'70%'} direction={'column'}>
        {renderTable()}
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

export default Detail
