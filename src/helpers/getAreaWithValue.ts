import { DataType, emissionsType } from 'pages/indicators/graph/types'

export const getAreaWithValue = (
  alcance1: emissionsType[],
  alcance2: emissionsType[],
  alcance3: emissionsType[],
  area: string
): DataType => {
  const [area1] = alcance1.filter(a => a.nombre === area)
  const [area2] = alcance2.filter(a => a.nombre === area)
  const [area3] = alcance3.filter(a => a.nombre === area)

  const value1 = area1 ? area1.valor : 0
  const value2 = area2 ? area2.valor : 0
  const value3 = area3 ? area3.valor : 0

  return [area, value1, value2, value3, value1 + value2 + value3]
}
