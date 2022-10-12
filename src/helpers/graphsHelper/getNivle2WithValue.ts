import { DataTypeAlcance3 } from '@components/Graphs/GraphsAlcanceTres/types'
import { DataTypeAlcance1 } from '@components/Graphs/GraphsAlcanceUno/types'

import { emissionsType } from 'pages/indicators/graph/types'

export const getNivel2WithValue = (
  headerTitle: string[],
  alcance1: emissionsType[],
  nivel2: string
): DataTypeAlcance1 | DataTypeAlcance3 => {
  const fuentesValue = []
  fuentesValue.push(nivel2)
  const [objValue] = alcance1.filter(al => al.nombre === nivel2)

  headerTitle.forEach((head, idx) => {
    if (idx !== 0 && idx !== headerTitle.length - 1) {
      if (objValue) {
        if (objValue.nombre === nivel2) {
          const [emission] = objValue.area.filter(ar => ar.nombre === head)
          if (emission) fuentesValue.push(emission.valor)
          else fuentesValue.push(0)
        }
      }
    }
  })

  if (objValue) fuentesValue.push(objValue.valor)
  else fuentesValue.push(0)
  if (fuentesValue.length === 6) return fuentesValue as DataTypeAlcance1
  else return fuentesValue as DataTypeAlcance3
}
