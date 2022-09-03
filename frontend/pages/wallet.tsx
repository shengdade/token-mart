import { Card, createStyles, Grid, Text } from '@mantine/core'
import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import useBalances from '../components/hooks/useBalances'
import MainLayout from '../components/layout/Main'
import WalletItem from '../components/wallet/WalletItem'
import { Metadata } from '../types'
import { getCollectionMetadata } from '../utils'

interface WalletProps {
  metadata: Metadata[]
}

const useStyles = createStyles((theme) => ({}))

const Wallet: NextPage<WalletProps> = ({ metadata }) => {
  const { classes } = useStyles()
  const balances = useBalances()
  const ownedItems = metadata
    .map((item, index) => ({
      ...item,
      balance: balances[index],
    }))
    .filter((item) => item.balance > 0)

  return (
    <div>
      <Head>
        <title>Wallet</title>
        <meta name="description" content="Game Items Wallet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      å
      <MainLayout>
        <Grid>
          <Grid.Col xs={12} sm={6}>
            <Card>
              <Text weight={600} size="xl" pb="md">
                Wallet
              </Text>
              {ownedItems.map(({ name, image, balance }) => (
                <WalletItem
                  key={name}
                  name={name}
                  image={image}
                  balance={balance}
                />
              ))}
            </Card>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<WalletProps> = async () => {
  const metadata = await getCollectionMetadata()

  return {
    props: {
      metadata,
    },
  }
}

export default Wallet
