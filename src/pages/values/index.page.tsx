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
import { useCustomLazyQuery } from 'hooks/useCustomLazyQuery'

import { useLoggedUserData } from 'hooks/useLoggedUserData'
import { Contaminante } from 'models/Contaminante'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GET_CONTAMINANTES } from './graphql'
import { getContaminantes } from './type'

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
  const { user } = useLoggedUserData(true)

  const [contaminantes, setContaminantes] = useState<
    Contaminante[] | undefined
  >(undefined)
  const [pagination, setPagination] = useState<number>(1)

  const { refetch } = useCustomLazyQuery<{
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
          Base de datos Huella Chile
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

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      {renderRightSection()}
    </Flex>
  )

  if (user)
    return (
      <Flex w={'full'} justify={'center'}>
        {renderUserLanding()}
      </Flex>
    )

  return <Box>holi</Box>
}

export default Values
