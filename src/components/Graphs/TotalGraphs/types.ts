import { TotalEmissionsByAlcanceType } from 'pages/indicators/graph/types'

export type DataType = [string, number, number, number, number]

export type GraphData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[] | string
    borderColor?: string[]
    borderWidth?: number
  }[]
}

export type TotalGraphsProps = {
  totalEmissionsByAlcance: TotalEmissionsByAlcanceType
}
