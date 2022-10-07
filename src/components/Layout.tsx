import { FC, useEffect, useState } from 'react'

import { Flex } from '@chakra-ui/react'
import { AnimateSharedLayout } from 'framer-motion'
import { useScreenSize } from 'hooks/useScreenSize'

import { Container } from './Container'
import { Navbar } from './NavBar'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { screenHeight } = useScreenSize()
  const [minH, setMinH] = useState(0)

  useEffect(() => {
    setMinH(
      screenHeight - (document?.getElementById('appFooter')?.clientHeight ?? 80)
    )
  }, [screenHeight])

  return (
    <AnimateSharedLayout>
      <Container minH={`${minH}px`}>
        <Navbar />
        <Flex
          justify={'center'}
          align={'center'}
          w={'full'}
          mt={['0', '6em']}
          flexDir={'column'}>
          {children}
        </Flex>
      </Container>
    </AnimateSharedLayout>
  )
}
