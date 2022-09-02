import { Grid } from '@mantine/core'
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Head from 'next/head'
import CollectableCard from '../components/collectable/CollectableCard'
import usePrices from '../components/hooks/usePrices'
import useStocks from '../components/hooks/useStocks'
import MainLayout from '../components/layout/Main'
import { METADATA_CID } from '../config'

const Home: NextPage = ({
  metadata,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const prices = usePrices()
  const stocks = useStocks()

  return (
    <div>
      <Head>
        <title>Token Mart</title>
        <meta name="description" content="Game Items Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Grid>
          {Array.from(Array(20).keys()).map((i) => (
            <Grid.Col sm={6} md={4} lg={3} key={i}>
              <CollectableCard
                id={i}
                name={metadata[i].name}
                image={metadata[i].image}
                price={prices ? prices[i] : ''}
                stock={stocks ? stocks[i] : 0}
              />
            </Grid.Col>
          ))}
        </Grid>
      </MainLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const URLs = Array.from(Array(20).keys()).map(
    (id) => `https://${METADATA_CID}.ipfs.nftstorage.link/${id}.json`
  )
  const responses = await Promise.all(URLs.map((url) => fetch(url)))

  const metadata = await Promise.all(
    responses.map((response) => response.json())
  )

  return {
    props: {
      metadata,
    },
  }
}

export default Home
