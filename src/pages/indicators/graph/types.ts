export type TotalEmissionsType = {
  emisionTotal: number
  unidadMedida: string
}

export type EmissionTypeByArea = {
  nombre: string
  valor: number
  unidadMedida: string
}

export type emissionsType = {
  nombre: string
  valor: number
  area: EmissionTypeByArea[]
  unidadMedida: string
}

export type AlcanceType = {
  emisionesPorNivel2: emissionsType[]
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
