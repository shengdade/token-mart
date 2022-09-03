import { Icon } from '@iconify/react'
import {
  Anchor,
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
  Tooltip,
} from '@mantine/core'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import useAddressName from '../../components/hooks/useAddressName'
import useBalance from '../../components/hooks/useBalance'
import usePrice from '../../components/hooks/usePrice'
import useStock from '../../components/hooks/useStock'
import useTotalSupply from '../../components/hooks/useTotalSupply'
import CardLayout from '../../components/layout/Card'
import Label from '../../components/layout/Label'
import MainLayout from '../../components/layout/Main'
import Price from '../../components/layout/Price'
import Stats from '../../components/layout/Stats'
import { ETHERSCAN_LINK, METADATA_CID, OPENSEA_LINK, OWNER } from '../../config'
import { Metadata } from '../../types'

interface CollectableProps {
  id: string
  metadata: Metadata
}

interface Params extends ParsedUrlQuery {
  id: string
}

const useStyles = createStyles((theme) => ({}))

const Collectable: NextPage<CollectableProps> = ({ id, metadata }) => {
  const { classes } = useStyles()
  const price = usePrice(id)
  const totalSupply = useTotalSupply(id)
  const stock = useStock(id)
  const balance = useBalance(id)
  const addressName = useAddressName(OWNER)
  const { name, description, image } = metadata

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
                      src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                      layout="fill"
                      alt="Image"
                    />
                  </AspectRatio>
                </Card.Section>
              </Card>
              <CardLayout icon="ic:outline-description" title="Description">
                <Text>{description}</Text>
              </CardLayout>
            </Stack>
          </Grid.Col>
          <Grid.Col md={7} sm={6} xs={12}>
            <Stack spacing="lg">
              <Group>
                <Title>{name}</Title>
                <Tooltip label="View in OpenSea">
                  <Anchor href={`${OPENSEA_LINK}${id}`} target="_blank">
                    <Icon icon="simple-icons:opensea" fontSize={24} />
                  </Anchor>
                </Tooltip>
              </Group>
              <Text>
                {`Owned by `}
                <Anchor href={`${ETHERSCAN_LINK}${OWNER}`} target="_blank">
                  {addressName}
                </Anchor>
              </Text>
              <Label label="Current Price" size="sm">
                <Price value={price} weight={500} size={40} />
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
                  title="Total Supply"
                  value={totalSupply}
                  icon="ic:outline-inventory-2"
                />
                <Stats
                  title="Available"
                  value={stock}
                  icon="ri:price-tag-line"
                />
                <Stats title="Owned" value={balance} icon="bx:wallet-alt" />
              </SimpleGrid>
            </Stack>
          </Grid.Col>
        </Grid>
      </MainLayout>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: Array.from(Array(20).keys()).map((id) => ({
      params: { id: `${id}` },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CollectableProps, Params> = async (
  context
) => {
  const { id } = context.params as Params
  const URL = `https://${METADATA_CID}.ipfs.nftstorage.link/${id}.json`
  const response = await fetch(URL)
  const metadata = await response.json()

  return {
    props: {
      id,
      metadata,
    },
  }
}

export default Collectable
