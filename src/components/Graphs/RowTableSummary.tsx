import { Td } from '@chakra-ui/react'
import { numberWithPoints } from 'helpers/number.helper'
import { FC } from 'react'
import { RowTableSumaryProps } from './types'

const RowTableSumary: FC<RowTableSumaryProps> = ({ isFirst, value }) => {
  return (
    <Td textAlign={'center'} fontWeight={isFirst ? 700 : 400}>
      {typeof value === 'number' ? numberWithPoints(Math.round(value)) : value}
    </Td>
  )
}

export default RowTableSumary
