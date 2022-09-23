import { Contaminante } from 'models/Contaminante'

export interface getContaminantes {
  pagination: number
  contaminantes: Contaminante[]
}
