export type TotalEmissionsType = {
  emisionTotal: number
  unidadMedida: string
}

export type emissionsType = {
  nombre: string
  valor: number
  unidadMedida: string
}

export type AlcanceType = {
  emisionesPorNivel2: emissionsType[]
  emisionesPorNivel3: emissionsType[]
  emisionesPorUnidad: emissionsType[]
  totalPorAlcance: TotalEmissionsType
}

export type TotalEmissionsByAlcanceType = {
  alcance1: AlcanceType
  alcance2: AlcanceType
  alcance3: AlcanceType
}

export type GraphsType = {
  totalEmissions: TotalEmissionsType
  totalEmissionsByAlcance: TotalEmissionsByAlcanceType
}

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
