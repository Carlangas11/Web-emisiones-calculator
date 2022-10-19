import {
  Flex,
  Text,
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { Bar, Pie } from 'react-chartjs-2'
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
import { FC, useEffect, useState } from 'react'
import { getAreaWithValue } from 'helpers/graphsHelper/getAreaWithValue'
import { DataType, GraphData, TotalGraphsProps } from './types'
import { headerTitle, optionsBar, optionsPie } from './constants'
import { useTranslation } from 'next-i18next'

import RowTableSumary from '../RowTableSummary'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const TotalGraphs: FC<TotalGraphsProps> = ({ totalEmissionsByAlcance }) => {
  const { t } = useTranslation('indicators')

  const [graphDataPie, setGraphDataPie] = useState<GraphData | undefined>()
  const [graphDataBar, setGraphDataBar] = useState<GraphData | undefined>()
  const [aguaMar, setAguaMar] = useState<DataType | undefined>()
  const [oficinas, setOficinas] = useState<DataType | undefined>()
  const [aguaDulce, setAguaDulce] = useState<DataType | undefined>()
  const [planta, setPlanta] = useState<DataType | undefined>()
  const [comercial, setComercial] = useState<DataType | undefined>()
  const [totalGeneral, setTotalGeneral] = useState<DataType | undefined>()

  useEffect(() => {
    if (totalEmissionsByAlcance) {
      const aguaMarValues = getAreaWithValue(
        totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Agua Mar'
      )

      setAguaMar(aguaMarValues)

      const aguaDulceValues = getAreaWithValue(
        totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        'Agua Dulce'
      )

      setAguaDulce(aguaDulceValues)

      const plantaValues = getAreaWithValue(
        totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Planta'
      )

      setPlanta(plantaValues)

      const oficinasValues = getAreaWithValue(
        totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
        'Oficinas'
      )

      setOficinas(oficinasValues)

      const comercialValues = getAreaWithValue(
        totalEmissionsByAlcance.alcance1.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance2.emisionesPorUnidad,
        totalEmissionsByAlcance.alcance3.emisionesPorUnidad,
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
  }, [totalEmissionsByAlcance])

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
            {aguaMar?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 4}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {aguaDulce?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 4}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {oficinas?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 4}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {planta?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 4}
                value={value}
              />
            ))}
          </Tr>
          <Tr>
            {comercial?.map((value, idx) => (
              <RowTableSumary
                key={idx.toString()}
                isFirst={idx === 0 || idx === 4}
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
        {t('totalGraphs')}
      </Text>
      <Text fontWeight={600} fontSize={'24px'} lineHeight={'48px'}>
        {Number(Number(totalGeneral?.[totalGeneral?.length - 1]).toFixed(0)).toLocaleString('es-CL') + ' kgCO2eq'}
      </Text>
      <Flex justify={'center'} mt={7}>
        <Box w={'95%'}>{renderTable()}</Box>
      </Flex>
      <Flex justify={'space-evenly'} align={'center'} mt={'24px'}>
        <Box width={'50%'}>
          {graphDataBar && <Bar options={optionsBar} data={graphDataBar} />}
        </Box>
        <Box w={'40%'} mt={4}>
          {graphDataPie && <Pie options={optionsPie} data={graphDataPie} />}
        </Box>
      </Flex>
    </Flex>
  )
}

export default TotalGraphs
