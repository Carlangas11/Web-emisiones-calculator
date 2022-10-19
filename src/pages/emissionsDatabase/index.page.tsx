import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Icon,
  Td
} from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import Loading from '@components/Loading'
import { useCustomLazyQuery } from 'hooks/useCustomLazyQuery'
import nextI18NextConfig from '@root/next-i18next.config.js'

import { Contaminante } from 'models/Contaminante'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect, useState } from 'react'
import { GET_CONTAMINANTES } from './graphql'
import { getContaminantes } from './type'
import { useTranslation } from 'next-i18next'
import MainContainerUI from '@components/MainContainerUI'

const tableHeaders = [
  'CCH Nivel 1',
  'CCH Nivel 2',
  'CCH Nivel 3',
  'CCH Nivel 4',
  'Contaminante',
  'Valor del FE',
  'Unidad del FE'
]

const Values: NextPage = () => {
  const { t } = useTranslation('emissionsDatabase')
  const [contaminantes, setContaminantes] = useState<
    Contaminante[] | undefined
  >(undefined)
  const [pagination, setPagination] = useState<number>(1)

  const { refetch, isFetching } = useCustomLazyQuery<{
    getContaminantes: getContaminantes
  }>(GET_CONTAMINANTES, 'getContaminantes', { input: pagination })

  const updateContaminantes = () => {
    refetch()
      .then(res => {
        setContaminantes(res.data?.getContaminantes.contaminantes)
      })
      .catch(() => {
        setContaminantes([])
      })
  }

  useEffect(() => {
    if (!contaminantes) updateContaminantes()
  }, [])

  const nextPage = () => {
    setPagination(pagination + 1)
    updateContaminantes()
  }

  const backPage = () => {
    if (pagination > 1) {
      setPagination(pagination - 1)
      updateContaminantes()
    }
  }

  const renderTable = () => {
    return (
      <TableContainer overflowY={'auto'}>
        <Table variant="striped" colorScheme="blue" size={'xs'}>
          <Thead bg={'teal'}>
            <Tr>
              {tableHeaders.map((title, idx) => (
                <Th key={idx.toString()} color={'white'} fontSize={'13px'}>
                  {title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {contaminantes &&
              contaminantes.map((contaminante, idx) => (
                <Tr key={idx.toString()}>
                  <Td fontSize={'13px'}>{contaminante.nivel1}</Td>
                  <Td fontSize={'13px'}>{contaminante.nivel2}</Td>
                  <Td fontSize={'13px'}>{contaminante.nivel3}</Td>
                  <Td fontSize={'13px'}>{contaminante.nivel4}</Td>
                  <Td fontSize={'13px'}>{contaminante.name}</Td>
                  <Td fontSize={'13px'} textAlign={'center'}>
                    {contaminante.value}
                  </Td>
                  <Td fontSize={'12px'} textAlign={'center'}>
                    {contaminante.measureUnit}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  const renderRightSection = () => {
    return (
      <MainContainerUI title={t('title')}>
        {renderTable()}
        <Flex w={'full'} my={'20px'} align={'center'} justify={'center'}>
          <Icon
            as={ArrowLeftIcon}
            _hover={{ color: 'red' }}
            cursor={'pointer'}
            onClick={backPage}
          />
          <Box mx={'5px'}>{pagination}</Box>
          <Icon
            as={ArrowRightIcon}
            _hover={{ color: 'red' }}
            cursor={'pointer'}
            onClick={nextPage}
          />
        </Flex>
      </MainContainerUI>
    )
  }

  const renderUserLanding = () =>
    !isFetching ? (
      <Flex w={'95%'} justify={'space-between'}>
        <LaterlMenu />
        {renderRightSection()}
      </Flex>
    ) : (
      <Loading />
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
        ['navbar', 'index', 'common', 'lateralMenu', 'emissionsDatabase'],
        nextI18NextConfig
      ))
    }
  }
}

export default Values
