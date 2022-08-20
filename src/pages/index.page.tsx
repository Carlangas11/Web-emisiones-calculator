import { Box, Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'

import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  const { user } = useLoggedUserData()

  const renderLanding = () => <>ZeroCompany</>

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Box w={'70%'}>ZeroCompany</Box>
    </Flex>
  )

  return (
    <Flex w={'full'} justify={'center'}>
      {user ? renderUserLanding() : renderLanding()}
    </Flex>
  )
}

export default Home