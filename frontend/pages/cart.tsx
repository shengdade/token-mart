import { Button, Card, Grid, Group, Stack, Text } from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import CartItem from '../components/cart/CartItem'
import MainLayout from '../components/layout/Main'
import Price from '../components/layout/Price'

const Cart: NextPage = () => {
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
              <CartItem />
              <CartItem />
              <CartItem />
            </Card>
          </Grid.Col>
          <Grid.Col md={4}>
            <Card>
              <Stack>
                <Group position="apart">
                  <Text weight={500} size="xl">
                    Total
                  </Text>
                  <Price value={3.03} weight={500} size="xl" />
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
