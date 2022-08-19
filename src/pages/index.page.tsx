import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session } = useSession()

  return (
    <Box mt={'30px'}>{session?.user ? session.user.email : 'Zero Company'}</Box>
  )
}

export default Home
