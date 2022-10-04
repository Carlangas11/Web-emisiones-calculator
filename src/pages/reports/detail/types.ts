export type ContaminantesType = {
  name: string
  value: number
  measureUnit: string
  emission: number
  emissionUnit: string
}

export type ReportItemType = {
  nivel1: string
  nivel2: string
  nivel3: string
  nivel4: string
  consumption: number
  consumptionUnit: string
  costCenter: string
  period: string
  totalFe: number
  measureUnitFe: string
  totalEmission: number
  totalEmissionUnit: string
  fuenteDeConsumo: string
  subfuenteDeConsumo: string
  contaminantes: ContaminantesType[]
}
