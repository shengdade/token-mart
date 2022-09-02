import { Grid } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import CollectableCard from '../components/collectable/CollectableCard'
import usePrices from '../components/hooks/usePrices'
import useStocks from '../components/hooks/useStocks'
import MainLayout from '../components/layout/Main'

const Home: NextPage = () => {
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

export default Home
