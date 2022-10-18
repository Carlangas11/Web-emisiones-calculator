import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Text,
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
        <Table variant="striped" colorScheme="blue" size={'sm'}>
          <Thead bg={'teal'}>
            <Tr>
              {tableHeaders.map((title, idx) => (
                <Th key={idx.toString()} color={'white'}>
                  {title}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {contaminantes &&
              contaminantes.map((contaminante, idx) => (
                <Tr key={idx.toString()}>
                  <Td>{contaminante.nivel1}</Td>
                  <Td>{contaminante.nivel2}</Td>
                  <Td>{contaminante.nivel3}</Td>
                  <Td>{contaminante.nivel4}</Td>
                  <Td>{contaminante.name}</Td>
                  <Td isNumeric>{contaminante.value}</Td>
                  <Td>{contaminante.measureUnit}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }

  const renderRightSection = () => {
    return (
      <Box w={'80%'}>
        <Text
          fontWeight={700}
          fontSize={'36px'}
          lineHeight={'56px'}
          my={'10px'}>
          {t('title')}
        </Text>
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
      </Box>
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
