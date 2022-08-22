import { BaseModel } from './BaseModel'

export interface Contaminante extends BaseModel {
  name: string
  value: number
  measureUnit: number
  nivel1: string
  nivel2: string
  nivel3: string
  nivel4: string
}
