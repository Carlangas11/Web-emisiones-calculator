import { FC } from 'react'
import { Box, Button, Flex, Icon, Img } from '@chakra-ui/react'
import ZeroCompany from 'assets/companies/ZeroCompany.png'
import { useRouter } from 'next/router'
import { BiUserCircle } from 'react-icons/bi'
import { signOut, useSession } from 'next-auth/react'
import { queryClient } from 'lib/queryClient'
import { useTranslation } from 'next-i18next'

export const Navbar: FC = () => {
  const { t } = useTranslation('navbar')
  const { data } = useSession()
  const router = useRouter()

  const onLogOut = async () => {
    await signOut()
    queryClient.clear()
    router.push('/auth/signin')
  }

  const renderNavbar = () => {
    return (
      <Flex
        w={'full'}
        mx={['3%', '3%', '5%', '5%', '5%', '11%']}
        direction={'row'}
        justify="space-between">
        <Box
          onClick={() => router.push('/')}
          cursor={'pointer'}
          w={['auto', '300px']}>
          <Img src={ZeroCompany.src} h={['24px', '110px']} width={['auto']} />
        </Box>
        <Flex justify="flex-end" align="center" gridGap={1}>
          <Button
            colorScheme={'unset'}
            bg={'white'}
            color={'gray.900'}
            borderRadius="26px"
            onClick={() => (data ? onLogOut() : router.push('/auth/signin'))}>
            {data ? t('logout') : t('signin')}
            <Icon as={BiUserCircle} ml="5px" w="1.5em" h="1.5em" />
          </Button>
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      h={'90px'}
      w={'100%'}
      bg={'grey'}
      align={'center'}
      position={'fixed'}
      zIndex={'200'}
      boxShadow={'lg'}>
      {renderNavbar()}
    </Flex>
  )
}
