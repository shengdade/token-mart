import { Grid } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import CollectableCard from '../components/collectable/CollectableCard'
import MainLayout from '../components/layout/Main'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>App</title>
        <meta name="description" content="Where Amazing Happens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Grid>
          {Array.from(Array(20).keys()).map((i) => (
            <Grid.Col sm={6} md={4} lg={3} key={i + 1}>
              <CollectableCard id={i + 1} />
            </Grid.Col>
          ))}
        </Grid>
      </MainLayout>
    </div>
  )
}

export default Home
