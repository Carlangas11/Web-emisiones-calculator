import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FaUserAlt } from 'react-icons/fa'
import { GoGraph, GoCloudUpload } from 'react-icons/go'
import { ImParagraphJustify } from 'react-icons/im'
import { TbReportAnalytics } from 'react-icons/tb'
import { IconType } from 'react-icons/lib'

const LaterlMenu = () => {
  const router = useRouter()
  const { t } = useTranslation('lateralMenu')

  const createItem = (name?: string, path?: string, icon?: IconType) => ({
    name,
    path,
    icon
  })

  const staticItems = [
    createItem(t('userInformation'), '/user-information', FaUserAlt),
    createItem(
      t('valuesInformation'),
      '/emissionsDatabase',
      ImParagraphJustify
    ),
    createItem(t('upload'), '/upload', GoCloudUpload),
    createItem(t('reports'), '/reports', TbReportAnalytics),
    createItem(t('indicators'), '/indicators', GoGraph)
  ]
  return (
    <Box>
      <Box w={'300px'} p=".5em" borderRadius="6px" boxShadow={'lg'}>
        {staticItems.map((item, index) => (
          <Flex
            cursor="pointer"
            gridGap={3}
            justify="start"
            align="center"
            bg={router.pathname.includes(item.path ?? '') ? 'gray.200' : 'none'}
            px="1em"
            py="0.5em"
            borderBottom={index + 1 < staticItems.length ? '1px solid' : 'none'}
            borderBottomColor="borders"
            key={item.name}
            onClick={() => item.path && router.push(item.path)}>
            <Icon as={item.icon} size={10} />
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
