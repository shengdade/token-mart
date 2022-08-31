import {
  AspectRatio,
  Button,
  Card,
  createStyles,
  Grid,
  Group,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import CardLayout from '../../components/layout/Card'
import Label from '../../components/layout/Label'
import MainLayout from '../../components/layout/Main'
import Price from '../../components/layout/Price'
import Stats from '../../components/layout/Stats'

const useStyles = createStyles((theme) => ({}))

const Collectable: NextPage = () => {
  const router = useRouter()
  const { classes } = useStyles()
  const { id } = router.query

  return (
    <div>
      <Head>
        <title>Collectable</title>
        <meta name="description" content="Collectable Item" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <Grid gutter="xl">
          <Grid.Col md={5} sm={6} xs={12}>
            <Stack spacing="lg">
              <Card shadow="sm" radius="lg">
                <Card.Section>
                  <AspectRatio ratio={2800 / 2100}>
                    <Image
                      src={`/images/${id}.png`}
                      layout="fill"
                      alt="Image"
                    />
                  </AspectRatio>
                </Card.Section>
              </Card>
              <CardLayout icon="ic:outline-description" title="Description">
                <Text>
                  a weapon with a long metal blade and a hilt with a hand guard,
                  used for thrusting or striking and now typically worn as part
                  of ceremonial dress.
                </Text>
              </CardLayout>
            </Stack>
          </Grid.Col>
          <Grid.Col md={7} sm={6} xs={12}>
            <Stack spacing="lg">
              <Title>Sword</Title>
              <Text>Owned by 0x0000000000000000000</Text>
              <Label label="Current Price" size="sm">
                <Price value={1.01} weight={500} size={40} />
              </Label>
              <Group align="flex-end">
                <NumberInput
                  label="Quantity"
                  radius="md"
                  defaultValue={1}
                  min={1}
                  max={1000}
                />
                <Button color="blue" variant="gradient" radius="md">
                  Add to Cart
                </Button>
              </Group>
              <SimpleGrid
                cols={3}
                breakpoints={[
                  { maxWidth: 'md', cols: 2 },
                  { maxWidth: 'xs', cols: 1 },
                ]}
              >
                <Stats
                  title="Current Price"
                  value="13,456"
                  icon="ri:price-tag-3-line"
                />
                <Stats
                  title="Total Supply"
                  value="100"
                  icon="ic:outline-inventory-2"
                />
                <Stats title="Available" value="12" icon="iconoir:coin" />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </div>
  )
}

export default Collectable
