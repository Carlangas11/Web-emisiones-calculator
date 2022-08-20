import { Box, Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { NextPage } from 'next'

const Values: NextPage = () => {
  const { user } = useLoggedUserData(true)

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Box w={'70%'}>{user?._id}</Box>
    </Flex>
  )

  return (
    <Flex w={'full'} justify={'center'}>
      {renderUserLanding()}
    </Flex>
  )
}

export default Values
