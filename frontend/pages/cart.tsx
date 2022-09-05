import { Anchor, Button, Card, Grid, Group, Stack, Text } from '@mantine/core'
import { formatEther, parseEther } from 'ethers/lib/utils'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import CartItem from '../components/cart/CartItem'
import Error from '../components/feedback/Error'
import Success from '../components/feedback/Success'
import Warning from '../components/feedback/Warning'
import MainLayout from '../components/layout/Main'
import Price from '../components/layout/Price'
import { contractConfig, ETHERSCAN } from '../config'
import { selectItems } from '../state/cartSlice'
import { useAppSelector } from '../state/hooks'
import { TransactionError } from '../types'

const Cart: NextPage = () => {
  const items = useAppSelector(selectItems)
  const ids = items.map((item) => item.id)
  const amounts = items.map((item) => item.amount)

  const totalPrice = items.reduce(
    (prev, cur) => parseEther(cur.price).mul(cur.amount).add(prev),
    parseEther('0')
  )

  const { config, error: warning } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'purchaseBatch',
    args: [ids, amounts],
    overrides: {
      value: totalPrice,
    },
  })

  const { data, write, isLoading, isSuccess, error } = useContractWrite(config)

  return (
    <div>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Shopping Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Grid>
          <Grid.Col md={8}>
            <Card>
              <Text weight={600} size="xl" pb="md">
                Cart
              </Text>
              {items.length === 0 ? (
                <Text>Your cart is empty.</Text>
              ) : (
                items.map((item) => <CartItem key={item.id} {...item} />)
              )}
            </Card>
          </Grid.Col>
          <Grid.Col md={4}>
            <Stack>
              <Card>
                <Stack>
                  <Group position="apart">
                    <Text weight={500} size="xl">
                      Total
                    </Text>
                    <Price
                      value={formatEther(totalPrice)}
                      weight={500}
                      size="xl"
                    />
                  </Group>
                  <Button
                    variant="gradient"
                    radius="md"
                    disabled={!write || items.length === 0}
                    loading={isLoading}
                    onClick={() => write?.()}
                  >
                    Proceed to Checkout
                  </Button>
                  <Link href="/" passHref>
                    <Button variant="default" radius="md" component="a">
                      Continue Shopping
                    </Button>
                  </Link>
                </Stack>
              </Card>
              {warning && (
                <Warning>{(warning as TransactionError).reason}</Warning>
              )}
              {error && <Error>{error?.message}</Error>}
              {isSuccess && (
                <Success>
                  {`Transaction Submitted `}
                  <Anchor
                    href={`${ETHERSCAN}/tx/${data?.hash}`}
                    target="_blank"
                  >
                    {data?.hash}
                  </Anchor>
                </Success>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </div>
  )
}

export default Cart
