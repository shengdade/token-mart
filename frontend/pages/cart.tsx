import { Button, Card, Grid, Group, Stack, Text } from '@mantine/core'
import { formatEther, parseEther } from 'ethers/lib/utils'
import type { NextPage } from 'next'
import Head from 'next/head'
import CartItem from '../components/cart/CartItem'
import MainLayout from '../components/layout/Main'
import Price from '../components/layout/Price'
import { selectItems } from '../state/cartSlice'
import { useAppSelector } from '../state/hooks'

const Cart: NextPage = () => {
  const items = useAppSelector(selectItems)

  const totalPrice = items.reduce(
    (prev, cur) => parseEther(cur.price).mul(cur.amount).add(prev),
    parseEther('0')
  )

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
              {items.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Card>
          </Grid.Col>
          <Grid.Col md={4}>
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
                <Button variant="gradient">Proceed to Checkout</Button>
                <Button variant="default">Continue Shopping</Button>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </div>
  )
}

export default Cart
