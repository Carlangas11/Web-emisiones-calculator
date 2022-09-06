import { FC } from 'react'
import { Box, Spinner } from '@chakra-ui/react'

const Loading: FC = () => {
  return (
    <Box
      w="full"
      h="80vh"
      display="flex"
      justifyContent="center"
      mt={50}
      alignItems="start">
      <Spinner size={'lg'} />
    </Box>
  )
}

export default Loading
