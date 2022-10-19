import {
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { getNivel2WithValue } from 'helpers/graphsHelper/getNivle2WithValue'

import { emissionsType } from 'pages/indicators/graph/types'
import { FC, useEffect, useState } from 'react'
import RowTableSumary from '../RowTableSummary'

import { DataTypeAlcance2 } from './types'
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
import { GraphData } from '../TotalGraphs/types'
import { useTranslation } from 'next-i18next'
import { Bar } from 'react-chartjs-2'
import { optionsBar } from './constants'

export type GraphsAlcanceDosProps = {
  alcance2: emissionsType[]
}

export const headerTitle = [
  'TONCO2eq',
  'Agua Dulce',
  'Agua Mar',
  'Oficinas',
  'Planta',
  'Total General'
]

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const GraphsAlcanceDos: FC<GraphsAlcanceDosProps> = ({ alcance2 }) => {
  const { t } = useTranslation('indicators')

  const [graphDataBar, setGraphDataBar] = useState<GraphData | undefined>()
  const [adquisicion, setAdquisicion] = useState<DataTypeAlcance2 | undefined>()

  const [totalGeneral, setTotalGeneral] = useState<
    DataTypeAlcance2 | undefined
  >()

  useEffect(() => {
    if (alcance2) {
      const adquisicionValue = getNivel2WithValue(
        headerTitle,
        alcance2,
        'Adquisición de electricidad'
      )

      setAdquisicion(adquisicionValue as DataTypeAlcance2)

      const totalAguaDulce = adquisicionValue[1]

      const totalAguaMar = adquisicionValue[2]

      const totalOficinas = adquisicionValue[3]

      const totalPlanta = adquisicionValue[4]

      const total = adquisicionValue[5]

      setTotalGeneral([
        'Total General',
        totalAguaDulce,
        totalAguaMar,
        totalOficinas,
        totalPlanta,
        total
      ] as DataTypeAlcance2)
    }
  }, [alcance2])

  useEffect(() => {
    if (adquisicion && totalGeneral) {
      const obj2 = {
        labels: ['Agua Dulce', 'Agua Mar', 'Oficinas', 'Planta'],
        datasets: [
          {
            label: totalGeneral[0],
            data: [
              totalGeneral[1],
              totalGeneral[2],
              totalGeneral[3],
              totalGeneral[4]
            ],
            backgroundColor: 'green'
          }
        ]
      }

      setGraphDataBar(obj2)
    }
  }, [adquisicion, totalGeneral])

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
          {' '}
          <Tr>
            {adquisicion?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 5}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {totalGeneral?.map((value, idx) => (
              <RowTableSumary key={idx.toString()} isFirst value={value} />
            ))}
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )

  return (
    <Flex direction={'column'}>
      <Text fontWeight={700} fontSize={'36px'} lineHeight={'48px'}>
        {t('graphsAlcance2')}
      </Text>
      <Text fontWeight={600} fontSize={'24px'} lineHeight={'48px'}>
        {Number(Number(totalGeneral?.[totalGeneral?.length - 1]).toFixed(0)).toLocaleString('es-CL') + ' tonCO2eq'}
      </Text>
      <Flex direction={'column'} justify={'center'} mt={7}>
        <Box w={'95%'} mx={'auto'}>
          {renderTable()}
        </Box>

        <Box width={'70%'} mx={'auto'} mt={4}>
          {graphDataBar && <Bar options={optionsBar} data={graphDataBar} />}
        </Box>
      </Flex>
    </Flex>
  )
}

export default GraphsAlcanceDos
