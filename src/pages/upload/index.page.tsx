import {
  Box,
  Button,
  Flex,
  FormControl,
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
import {
  CheckIcon,
  DeleteIcon,
  AttachmentIcon,
  DownloadIcon
} from '@chakra-ui/icons'
import { GoCloudUpload } from 'react-icons/go'
import * as XLSX from 'xlsx'
import { useCustomMutation } from 'hooks/useCustomMutation'
import { GENERATE_REPORT } from './graphql'
import Loading from '@components/Loading'

import { ExcelRowType, ExcelType } from './types'
import { useSession } from 'next-auth/react'
import MainContainerUI from '@components/MainContainerUI'

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
        onSuccess: () => {
          setNameFile(undefined)
          setSaveFile([])
          alert(t('fileSend'))
        },
        onError: () => {
          alert(t('failedSend'))
        }
      }
    )
  }

  const { data } = useSession()
  const downloadFile = async (file: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/resource/getFile/${file}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${data?.accessToken}`
        }
      }
    )

    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${file}.xlsx`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const downloadExcel = (tableRows: ExcelRowType[]) => {
    const objectData = tableRows.map(row => {
      return {
        Alcance: row.alcance,
        'Fuente de Consumo': row.fuenteDeConsumo,
        'Subfuente de Consumo': row.subfuenteDeConsumo,
        Area: row.area,
        Unidades: row.unidades,
        ' Consumo Anual ': row.consumoAnual
      }
    })

    const ws = XLSX.utils.json_to_sheet(objectData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'tableData')
    XLSX.writeFile(wb, 'tableData.xlsx')
  }

  useEffect(() => {
    if (saveFile.length > 0) setHeaderTitle(Object.keys(saveFile[0]))
  }, [saveFile])

  const renderUserLanding = () => (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <MainContainerUI title={t('labelDocs')}>
        <FormControl>
          <Input
            ref={inputRef}
            hidden
            id="files"
            type={'file'}
            multiple
            onChange={fileInputChange}
          />
          <Flex w={'full'} justify={'space-between'}>
            <Button
              w={['full', 'full', 'full', '30%']}
              disabled={!!nameFile}
              p={'10px 24px'}
              border={'1px solid #622A74'}
              color={'gray.900'}
              bg={'#FFF'}
              fontSize={'14px'}
              leftIcon={<Icon color={'gray.900'} as={GoCloudUpload} />}
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
              fontSize={'14px'}
              bg={'blue.900'}
              leftIcon={<Icon color={'#FFF'} as={CheckIcon} />}>
              {t('sendFile')}
            </Button>
            <Button
              w={['full', 'full', 'full', '30%']}
              p={'10px 24px'}
              border={'1px solid #622A74'}
              color={'#FFF'}
              fontSize={'14px'}
              onClick={() => downloadFile('inputFile')}
              bg={'blue.900'}
              leftIcon={<Icon color={'#FFF'} as={AttachmentIcon} />}>
              {t('download')}
            </Button>
          </Flex>
          {nameFile && (
            <Flex bg={'#F2F2F2;'} px={'26px'} my={'20px'} direction={'column'}>
              <Flex justify={'space-between'} my={'8px'}>
                <Text fontWeight={400} fontSize={'16px'} lineHeight={'19px'}>
                  {nameFile}
                </Text>
                <Flex gridGap={4}>
                  <Box
                    cursor={'pointer'}
                    onClick={() => {
                      downloadExcel(saveFile)
                    }}>
                    <Icon as={DownloadIcon} />
                  </Box>
                  <Box
                    cursor={'pointer'}
                    onClick={() => {
                      deleteFile()
                    }}>
                    <Icon as={DeleteIcon} />
                  </Box>
                </Flex>
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
      </MainContainerUI>
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
