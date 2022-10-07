import {
  Box,
  Flex,
  Text,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '@root/next-i18next.config.js'
import { useTranslation } from 'next-i18next'

import { useRouter } from 'next/router'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js'

import { GET_GRAPHS } from '../graphql'
import { useCustomQuery } from 'hooks/useCustomQuery'
import { DataType, GraphData, GraphsType } from './types'
import { useEffect, useState } from 'react'
import { getAreaWithValue } from 'helpers/getAreaWithValue'
import { Bar, Pie } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Consumo por alcance'
    }
  }
}

export const optionsPie = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right' as const
    },
    title: {
      display: true,
      text: 'Consumo por área'
    }
  }
}

const headerTitle = [
  'TONCO2eq',
  'Alcance 1',
  'Alcance 2',
  'Alcance 3',
  'Total general'
]

const Graph: NextPage = () => {
  useLoggedUserData(true)
  const { t } = useTranslation('indicators')

  const router = useRouter()
  const id = router.query.id?.toString()

  const [graphDataPie, setGraphDataPie] = useState<GraphData | undefined>()
  const [graphDataBar, setGraphDataBar] = useState<GraphData | undefined>()
  const [aguaMar, setAguaMar] = useState<DataType | undefined>()
  const [oficinas, setOficinas] = useState<DataType | undefined>()
  const [aguaDulce, setAguaDulce] = useState<DataType | undefined>()
  const [planta, setPlanta] = useState<DataType | undefined>()
  const [comercial, setComercial] = useState<DataType | undefined>()
  const [totalGeneral, setTotalGeneral] = useState<DataType | undefined>()

  const { data } = useCustomQuery<{ getGraphs: GraphsType }>(
    GET_GRAPHS,
    'getGrapsh',
    {
      input: {
        idReport: id?.toString() || '633250e31d03b12d254ba5ef'
      }
    }
  )

  useEffect(() => {
    if (data) {
      const aguaMarValues = getAreaWithValue(
        data.getGraphs.totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Agua Mar'
      )

      setAguaMar(aguaMarValues)

      const aguaDulceValues = getAreaWithValue(
        data.getGraphs.totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Agua Dulce'
      )

      setAguaDulce(aguaDulceValues)

      const plantaValues = getAreaWithValue(
        data.getGraphs.totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Planta'
      )

      setPlanta(plantaValues)

      const oficinasValues = getAreaWithValue(
        data.getGraphs.totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Oficinas'
      )

      setOficinas(oficinasValues)

      const comercialValues = getAreaWithValue(
        data.getGraphs.totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        data.getGraphs.totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Comercial'
      )

      setComercial(comercialValues)
      const totalAlcance1 = (aguaMarValues[1] +
        aguaDulceValues[1] +
        comercialValues[1] +
        oficinasValues[1] +
        plantaValues[1]) as number

      const totalAlcance2 = (aguaMarValues[2] +
        aguaDulceValues[2] +
        comercialValues[2] +
        oficinasValues[2] +
        plantaValues[2]) as number

      const totalAlcance3 = (aguaMarValues[3] +
        aguaDulceValues[3] +
        comercialValues[3] +
        oficinasValues[3] +
        plantaValues[3]) as number

      const total = (aguaMarValues[4] +
        aguaDulceValues[4] +
        comercialValues[4] +
        oficinasValues[4] +
        plantaValues[4]) as number

      setTotalGeneral([
        'Total general',
        totalAlcance1,
        totalAlcance2,
        totalAlcance3,
        total
      ])
    }
  }, [data])

  useEffect(() => {
    if (
      aguaMar &&
      aguaDulce &&
      planta &&
      oficinas &&
      comercial &&
      totalGeneral
    ) {
      const obj = {
        labels: [
          aguaMar[0],
          aguaDulce[0],
          planta[0],
          oficinas[0],
          comercial[0]
        ],
        datasets: [
          {
            label: t('emissionsByArea'),
            data: [
              aguaMar[4],
              aguaDulce[4],
              planta[4],
              oficinas[4],
              comercial[4]
            ],
            backgroundColor: ['red', 'blue', 'orange', 'purple', 'yellow'],
            borderColor: ['red', 'blue', 'orange', 'purple', 'yellow'],
            borderWidth: 2
          }
        ]
      }
      setGraphDataPie(obj)

      const obj2 = {
        labels: ['Alcance 1', 'Alcance 2', 'Alcance 3'],
        datasets: [
          {
            label: totalGeneral[0],
            data: [totalGeneral[1], totalGeneral[2], totalGeneral[3]],
            backgroundColor: 'green'
          }
        ]
      }

      setGraphDataBar(obj2)
    }
  }, [aguaMar, aguaDulce, planta, oficinas, comercial])

  const renderTable = () => (
    <TableContainer overflowY={'auto'}>
      <Table variant="striped" colorScheme="blue" size={'sm'}>
        <Thead bg={'teal'}>
          <Tr>
            {headerTitle?.map((title, idx) => (
              <Th key={idx.toString()} color={'white'} textAlign={'center'}>
                {title}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            {aguaMar &&
              aguaMar.map((value, idx) => (
                <Td
                  textAlign={'center'}
                  fontWeight={idx === 0 || idx === 4 ? 700 : 400}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
          <Tr>
            {aguaDulce &&
              aguaDulce.map((value, idx) => (
                <Td
                  textAlign={'center'}
                  fontWeight={idx === 0 || idx === 4 ? 700 : 400}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
          <Tr>
            {oficinas &&
              oficinas.map((value, idx) => (
                <Td
                  textAlign={'center'}
                  fontWeight={idx === 0 || idx === 4 ? 700 : 400}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
          <Tr>
            {planta &&
              planta.map((value, idx) => (
                <Td
                  textAlign={'center'}
                  fontWeight={idx === 0 || idx === 4 ? 700 : 400}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
          <Tr>
            {comercial &&
              comercial.map((value, idx) => (
                <Td
                  textAlign={'center'}
                  fontWeight={idx === 0 || idx === 4 ? 700 : 400}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
          <Tr>
            {totalGeneral &&
              totalGeneral.map((value, idx) => (
                <Td key={idx.toString()} textAlign={'center'} fontWeight={700}>
                  {typeof value === 'number' ? Math.round(value) : value}
                </Td>
              ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

  return (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Flex w={'70%'} direction={'column'}>
        <Text fontWeight={700} fontSize={'36px'} lineHeight={'48px'}>
          Graficos de informe
        </Text>
        <Flex justify={'center'} mt={7}>
          <Box>{renderTable()}</Box>
        </Flex>
        <Flex justify={'space-evenly'} align={'center'} mt={'24px'}>
          <Box width={'50%'}>
            {graphDataBar && <Bar options={optionsBar} data={graphDataBar} />}
          </Box>
          <Box w={'40%'}>
            {graphDataPie && <Pie options={optionsPie} data={graphDataPie} />}
          </Box>
        </Flex>
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

export default Graph
