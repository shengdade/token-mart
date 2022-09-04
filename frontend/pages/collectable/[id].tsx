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
import { ethers } from 'ethers'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ParsedUrlQuery } from 'querystring'
import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import Error from '../../components/feedback/Error'
import Success from '../../components/feedback/Success'
import Warning from '../../components/feedback/Warning'
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
import { contractConfig, ETHERSCAN, OPENSEA_LINK, OWNER } from '../../config'
import { Metadata, TransactionError } from '../../types'
import { getMetadata } from '../../utils'

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
  const [amount, setAmount] = useState<number>(1)
  const price = usePrice(id)
  const totalSupply = useTotalSupply(id)
  const stock = useStock(id)
  const balance = useBalance(id)
  const addressName = useAddressName(OWNER)
  const { name, description, image } = metadata

  const { config, error: warning } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'purchase',
    args: [id, amount],
    overrides: {
      value: ethers.utils.parseEther(price).mul(amount),
    },
  })

  const { data, write, isLoading, isSuccess, error } = useContractWrite(config)

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
                <Anchor href={`${ETHERSCAN}/address/${OWNER}`} target="_blank">
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
                  value={amount}
                  onChange={(value) => {
                    if (value) setAmount(value)
                  }}
                  min={1}
                />
                <Button
                  color="blue"
                  variant="gradient"
                  radius="md"
                  disabled={!write}
                  loading={isLoading}
                  onClick={() => write?.()}
                >
                  Buy Now
                </Button>
                <Button variant="outline" radius="md">
                  Add to Cart
                </Button>
              </Group>
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
  const metadata = await getMetadata(id)

  return {
    props: {
      id,
      metadata,
    },
  }
}

export default Collectable
