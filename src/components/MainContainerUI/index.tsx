import { FC } from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

import { MainContainerProps } from './types'

const MainContainerUI: FC<MainContainerProps> = ({
  children,
  title,
  bg,
  fontSize = '25px',
  fontSizeSubtitle = '16px',
  rightSection,
  subtitle
}) => {
  return (
    <Box
      bg="white"
      borderRadius={5}
      borderWidth={1}
      p="2rem"
      mx={'auto'}
      mb={10}
      ml={6}
      w={'80%'}
      minH={'80vh'}>
      <Flex direction="column">
        <Flex
          mb={title && '2.5rem'}
          justifyContent="space-between"
          flexWrap="wrap">
          <Flex direction="column">
            {title && (
              <>
                <Text fontWeight="bold" fontSize={fontSize}>
                  {title}
                </Text>
                <Box mt={1} h="1.5px" width="93px" bg={bg} />
              </>
            )}
            {subtitle && (
              <Text
                marginTop="12px"
                fontSize={fontSizeSubtitle}
                fontWeight="500">
                {subtitle}
              </Text>
            )}
          </Flex>
          {rightSection && (
            <Flex width="350px" justifyContent="flex-end" alignItems="center">
              {rightSection}
            </Flex>
          )}
        </Flex>

        {children}
      </Flex>
    </Box>
  )
}

export default MainContainerUI
