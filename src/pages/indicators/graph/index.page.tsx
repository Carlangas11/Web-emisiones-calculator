import { Flex } from '@chakra-ui/react'
import LaterlMenu from '@components/LateralMenu'
import { useLoggedUserData } from 'hooks/useLoggedUserData'
import type { GetServerSideProps, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import nextI18NextConfig from '@root/next-i18next.config.js'

import { useRouter } from 'next/router'

import { GET_GRAPHS } from '../graphql'
import { useCustomQuery } from 'hooks/useCustomQuery'
import { GraphsType } from './types'

import TotalGraphs from '@components/Graphs/TotalGraphs'
import GraphsAlcanceUno from '@components/Graphs/GraphsAlcanceUno'
import GraphsAlcanceDos from '@components/Graphs/GraphsAlcanceDos'
import GraphsAlcanceTres from '@components/Graphs/GraphsAlcanceTres'

const Graph: NextPage = () => {
  useLoggedUserData(true)

  const router = useRouter()
  const id = router.query.id?.toString()

  const { data } = useCustomQuery<{ getGraphs: GraphsType }>(
    GET_GRAPHS,
    'getGrapsh',
    {
      input: {
        idReport: id?.toString()
      }
    }
  )

  return (
    <Flex w={'95%'} justify={'space-between'}>
      <LaterlMenu />
      <Flex w={'70%'} direction={'column'}>
        {data && (
          <>
            <TotalGraphs
              totalEmissionsByAlcance={data?.getGraphs.totalEmissionsByAlcance}
            />
            <GraphsAlcanceUno
              alcance1={
                data?.getGraphs.totalEmissionsByAlcance.alcance1
                  .emisionesPorNivel2
              }
            />
            <GraphsAlcanceDos
              alcance2={
                data?.getGraphs.totalEmissionsByAlcance.alcance2
                  .emisionesPorNivel2
              }
            />
            <GraphsAlcanceTres
              alcance1={
                data?.getGraphs.totalEmissionsByAlcance.alcance3
                  .emisionesPorNivel2
              }
            />
          </>
        )}
      </Flex>
    </Flex>
  )
}

export const getStaticProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale || 'es',
        ['navbar', 'index', 'common', 'lateralMenu', 'indicators'],
        nextI18NextConfig
      ))
    }
  }
}

export default Graph
