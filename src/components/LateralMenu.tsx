import { Box, Flex, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

const LaterlMenu = () => {
  const router = useRouter()
  const { t } = useTranslation('lateralMenu')

  const createItem = (name?: string, path?: string) => ({
    name,
    path
  })

  const staticItems = [
    createItem(t('userInformation'), '/user-information'),
    createItem(t('valuesInformation'), '/emissionsReport'),
    createItem(t('upload'), '/upload'),
    createItem(t('reports'), '/reports')
  ]
  return (
    <Box>
      <Box w={'335px'} p=".5em" borderRadius="6px" boxShadow={'lg'}>
        {staticItems.map((item, index) => (
          <Flex
            cursor="pointer"
            gridGap={2}
            justify="start"
            align="center"
            bg={router.pathname.includes(item.path ?? '') ? 'gray.200' : 'none'}
            px="1em"
            py="0.5em"
            borderBottom={index + 1 < staticItems.length ? '1px solid' : 'none'}
            borderBottomColor="borders"
            key={item.name}
            onClick={() => item.path && router.push(item.path)}>
            <Box w="34px" h="34px" bg="borders" />
            <Text w={'80%'} fontSize={'16px'}>
              {item.name}
            </Text>
          </Flex>
        ))}
      </Box>
    </Box>
  )
}

export default LaterlMenu
