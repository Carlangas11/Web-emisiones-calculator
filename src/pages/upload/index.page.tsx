import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import nextI18NextConfig from '@root/next-i18next.config.js'
import { useTranslation } from 'next-i18next'
import { CheckIcon, DeleteIcon } from '@chakra-ui/icons'
import { BiCamera } from 'react-icons/bi'
import * as XLSX from 'xlsx'
import { useCustomMutation } from 'hooks/useCustomMutation'
import { GENERATE_REPORT } from './graphql'
import Loading from '@components/Loading'

type ExcelRowType = {
  consumoAnual: number
  alcance: number
  fuenteDeConsumo: string
  subfuenteDeConsumo: string
  area: string
  unidades: string
}

type ExcelType = {
  ' Consumo Anual ': number
  Alcance: number
  Area: string
  'Fuente de Consumo': string
  'Subfuente de Consumo': string
  Unidades: string
}

const Upload: NextPage = () => {
  const { t } = useTranslation('upload')
  useLoggedUserData(true)
  const [nameFile, setNameFile] = useState<string | undefined>()
  const [saveFile, setSaveFile] = useState<ExcelRowType[]>([])
  const [headerTitle, setHeaderTitle] = useState<string[] | undefined>()

  const inputRef = useRef<HTMLInputElement | null>(null)

  const { mutate, isLoading } = useCustomMutation(
    GENERATE_REPORT,
    'generateReport'
  )

  const handleClick = () => inputRef.current?.click()

  const fileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && !nameFile) {
      const reader = new FileReader()

      reader.readAsArrayBuffer(event.target.files[0])
      reader.onloadend = e => {
        const data = new Uint8Array(e?.target?.result as ArrayBuffer)
        const wb = XLSX.read(data, { type: 'array' })

        const file: ExcelRowType[] = []

        const excel = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
          raw: true
        }) as ExcelType[]

        excel.forEach(row => {
          const obj = {
            alcance: row['Alcance'],
            consumoAnual: row[' Consumo Anual '],
            area: row['Area'],
            fuenteDeConsumo: row['Fuente de Consumo'],
            subfuenteDeConsumo: row['Subfuente de Consumo'],
            unidades: row['Unidades']
          }

          file.push(obj)
        })

        console.log('this excel.: ', excel)

        setSaveFile(file)
      }

      setNameFile(event.target.files[0].name)
    }
  }

  const deleteFile = () => {
    setNameFile(undefined)
    setSaveFile([])
  }

  const sendReport = () => {
    mutate(
      { input: saveFile },
      {
        onSuccess: data => {
          console.log('esto', data)
          setNameFile(undefined)
          setSaveFile([])
          alert('Archivo enviado')
        },
        onError: () => {
          alert('no se pudo enviar el archivo')
        }
      }
    )
  }

  useEffect(() => {
    if (saveFile.length > 0) setHeaderTitle(Object.keys(saveFile[0]))
  }, [saveFile])

  console.log('quiero: ', saveFile)

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Flex w={'70%'} direction={'column'}>
        <FormControl>
          <FormLabel fontWeight={400} fontSize={'16px'} lineHeight={'19px'}>
            {t('labelDocs')}
          </FormLabel>
          <Input
            ref={inputRef}
            hidden
            id="files"
            type={'file'}
            multiple
            onChange={fileInputChange}
          />
          <Button
            w={['full', 'full', 'full', '30%']}
            disabled={!!nameFile}
            p={'10px 24px'}
            border={'1px solid #622A74'}
            color={'gray.900'}
            bg={'#FFF'}
            leftIcon={<Icon color={'gray.900'} as={BiCamera} />}
            onClick={handleClick}>
            {t('addFile')}
          </Button>
          <Button
            w={['full', 'full', 'full', '30%']}
            disabled={saveFile.length === 0}
            p={'10px 24px'}
            border={'1px solid #622A74'}
            color={'#FFF'}
            onClick={sendReport}
            bg={'blue.900'}
            leftIcon={<Icon color={'#FFF'} as={CheckIcon} />}>
            {t('addFile')}
          </Button>
          {nameFile && (
            <Flex bg={'#F2F2F2;'} p={'16px'} mt={'24px'} direction={'column'}>
              <Flex justify={'space-between'} my={'8px'}>
                <Text fontWeight={400} fontSize={'16px'} lineHeight={'19px'}>
                  {nameFile}
                </Text>
                <Box
                  cursor={'pointer'}
                  onClick={() => {
                    deleteFile()
                  }}>
                  <Icon as={DeleteIcon} />
                </Box>
              </Flex>
            </Flex>
          )}
        </FormControl>

        {isLoading ? (
          <Loading />
        ) : (
          saveFile.length > 0 && (
            <TableContainer overflowY={'auto'}>
              <Table variant="striped" colorScheme="blue" size={'sm'}>
                <Thead bg={'teal'}>
                  <Tr>
                    {headerTitle?.map((title, idx) => (
                      <Th
                        key={idx.toString()}
                        color={'white'}
                        textAlign={'center'}>
                        {title}
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {headerTitle &&
                    saveFile.map((save, idx) => (
                      <Tr key={idx.toString()}>
                        {headerTitle.map(title => {
                          return (
                            <Td textAlign={'center'} key={title.toString()}>
                              {save[title as keyof ExcelRowType]}
                            </Td>
                          )
                        })}
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )
        )}
      </Flex>
    </Flex>
  )

  return (
    <Flex w={'full'} justify={'center'}>
      {renderUserLanding()}
    </Flex>
  )
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'index', 'common', 'lateralMenu', 'upload'],
        nextI18NextConfig
      ))
    }
  }
}

export default Upload
