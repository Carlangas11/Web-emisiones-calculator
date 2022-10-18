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

import { DataTypeAlcance3 } from './types'
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

export type GraphsAlcanceTresProps = {
  alcance1: emissionsType[]
}

export const headerTitle = [
  'TONCO2eq',
  'Agua Dulce',
  'Agua Mar',
  'Oficinas',
  'Planta',
  'Comercial',
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

const GraphsAlcanceTres: FC<GraphsAlcanceTresProps> = ({ alcance1 }) => {
  const { t } = useTranslation('indicators')
  const [graphDataBar, setGraphDataBar] = useState<GraphData | undefined>()

  const [serviciosAdquiridos, setServiciosAdquiridos] = useState<
    DataTypeAlcance3 | undefined
  >()
  const [tratamientoResiduos, setTratamientoResiduos] = useState<
    DataTypeAlcance3 | undefined
  >()
  const [transporteCarga, setTransporteCarga] = useState<
    DataTypeAlcance3 | undefined
  >()
  const [transportePersonas, setTransportePersonas] = useState<
    DataTypeAlcance3 | undefined
  >()
  const [totalGeneral, setTotalGeneral] = useState<
    DataTypeAlcance3 | undefined
  >()

  useEffect(() => {
    if (alcance1) {
      const serviciosAdquiridosValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Bienes y servicios adquiridos'
      ) as DataTypeAlcance3

      setServiciosAdquiridos(serviciosAdquiridosValue)

      const tratamientoResiduosValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Tratamiento y/o disposición de residuos'
      ) as DataTypeAlcance3

      setTratamientoResiduos(tratamientoResiduosValue)

      const trasnsporteCargaValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Transporte de carga'
      ) as DataTypeAlcance3

      setTransporteCarga(trasnsporteCargaValue)

      const transportePersonasValue = getNivel2WithValue(
        headerTitle,
        alcance1,
        'Movilización de personas'
      ) as DataTypeAlcance3

      setTransportePersonas(transportePersonasValue)

      const totalAguaDulce =
        serviciosAdquiridosValue[1] +
        tratamientoResiduosValue[1] +
        trasnsporteCargaValue[1] +
        transportePersonasValue[1]
      const totalAguaMar =
        serviciosAdquiridosValue[2] +
        tratamientoResiduosValue[2] +
        trasnsporteCargaValue[2] +
        transportePersonasValue[2]
      const totalOficinas =
        serviciosAdquiridosValue[3] +
        tratamientoResiduosValue[3] +
        trasnsporteCargaValue[3] +
        transportePersonasValue[3]
      const totalPlanta =
        serviciosAdquiridosValue[4] +
        tratamientoResiduosValue[4] +
        trasnsporteCargaValue[4] +
        transportePersonasValue[4]

      const totalComercial =
        serviciosAdquiridosValue[5] +
        tratamientoResiduosValue[5] +
        trasnsporteCargaValue[5] +
        transportePersonasValue[5]

      const total =
        serviciosAdquiridosValue[6] +
        tratamientoResiduosValue[6] +
        trasnsporteCargaValue[6] +
        transportePersonasValue[6]

      setTotalGeneral([
        'Total General',
        totalAguaDulce,
        totalAguaMar,
        totalOficinas,
        totalPlanta,
        totalComercial,
        total
      ])
    }
  }, [alcance1])

  useEffect(() => {
    if (
      serviciosAdquiridos &&
      tratamientoResiduos &&
      transporteCarga &&
      transportePersonas &&
      totalGeneral
    ) {
      const obj2 = {
        labels: [
          serviciosAdquiridos[0],
          tratamientoResiduos[0],
          transporteCarga[0],
          transportePersonas[0]
        ],
        datasets: [
          {
            label: t('emissionsByNivel3'),
            data: [
              serviciosAdquiridos[6],
              tratamientoResiduos[6],
              transporteCarga[6],
              transportePersonas[6]
            ],
            backgroundColor: 'green'
          }
        ]
      }

      setGraphDataBar(obj2)
    }
  }, [
    serviciosAdquiridos,
    tratamientoResiduos,
    transporteCarga,
    transportePersonas,
    totalGeneral
  ])

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
            {serviciosAdquiridos?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 6}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {tratamientoResiduos?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 6}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {transporteCarga?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 6}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {transportePersonas?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 6}
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
        {t('graphsAlcance3')}
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

export default GraphsAlcanceTres
