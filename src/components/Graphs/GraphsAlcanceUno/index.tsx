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

import { DataTypeAlcance1 } from './types'
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

export type GraphsAlcanceUnoProps = {
  alcance1: emissionsType[]
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

const GraphsAlcanceUno: FC<GraphsAlcanceUnoProps> = ({ alcance1 }) => {
  const { t } = useTranslation('indicators')
  const [graphDataBar, setGraphDataBar] = useState<GraphData | undefined>()
  const [fuentesFijas, setFuentesFijas] = useState<
    DataTypeAlcance1 | undefined
  >()
  const [fuentesMoviles, setFuentesMoviles] = useState<
    DataTypeAlcance1 | undefined
  >()
  const [emisionesFugitivas, setEmisionesFugitivas] = useState<
    DataTypeAlcance1 | undefined
  >()
  const [totalGeneral, setTotalGeneral] = useState<
    DataTypeAlcance1 | undefined
  >()

  useEffect(() => {
    if (alcance1) {
      const fuentesFijasValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Fuentes fijas'
      ) as DataTypeAlcance1

      setFuentesFijas(fuentesFijasValue)

      const fuentesMovilesValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Fuentes móviles'
      ) as DataTypeAlcance1

      setFuentesMoviles(fuentesMovilesValue)

      const emisionesFugitivasValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Emisiones fugitivas'
      ) as DataTypeAlcance1

      setEmisionesFugitivas(emisionesFugitivasValue)

      const totalAguaDulce =
        fuentesFijasValue[1] +
        fuentesMovilesValue[1] +
        emisionesFugitivasValue[1]
      const totalAguaMar =
        fuentesFijasValue[2] +
        fuentesMovilesValue[2] +
        emisionesFugitivasValue[2]
      const totalOficinas =
        fuentesFijasValue[3] +
        fuentesMovilesValue[3] +
        emisionesFugitivasValue[3]
      const totalPlanta =
        fuentesFijasValue[4] +
        fuentesMovilesValue[4] +
        emisionesFugitivasValue[4]

      const total =
        fuentesFijasValue[5] +
        fuentesMovilesValue[5] +
        emisionesFugitivasValue[5]

      setTotalGeneral([
        'Total General',
        totalAguaDulce,
        totalAguaMar,
        totalOficinas,
        totalPlanta,
        total
      ])
    }
  }, [alcance1])

  useEffect(() => {
    if (fuentesFijas && fuentesMoviles && emisionesFugitivas && totalGeneral) {
      const obj1 = {
        labels: [fuentesFijas[0], fuentesMoviles[0], emisionesFugitivas[0]],
        datasets: [
          {
            label: t('emissionsByNivel2'),
            data: [fuentesFijas[5], fuentesMoviles[5], emisionesFugitivas[5]],
            backgroundColor: ['red']
          }
        ]
      }

      setGraphDataBar(obj1)
    }
  }, [fuentesFijas, fuentesMoviles, emisionesFugitivas, totalGeneral])

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
            {fuentesFijas?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 5}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {fuentesMoviles?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 5}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {emisionesFugitivas?.map((value, idx) => (
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
        {t('graphsAlcance1')}
      </Text>
      <Text fontWeight={600} fontSize={'24px'} lineHeight={'48px'}>
        {Number(Number(totalGeneral?.[totalGeneral?.length - 1]).toFixed(0)).toLocaleString('es-CL') + ' tonCO2eq'}
      </Text>
      <Flex direction={'column'} justify={'center'} mt={7}>
        <Box w={'95%'} mx={'auto'}>
          {renderTable()}
        </Box>
        <Box w={'70%'} mx={'auto'} mt={4}>
          {graphDataBar && <Bar options={optionsBar} data={graphDataBar} />}
        </Box>
      </Flex>
    </Flex>
  )
}

export default GraphsAlcanceUno
