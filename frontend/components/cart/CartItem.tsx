import { Icon } from '@iconify/react'
import {
  AspectRatio,
  Button,
  Card,
  createStyles,
  Grid,
  NumberInput,
  Stack,
  Text,
} from '@mantine/core'
import { formatEther, parseEther } from 'ethers/lib/utils'
import Image from 'next/image'
import { removeItem, updateAmount } from '../../state/cartSlice'
import { useAppDispatch } from '../../state/hooks'
import { Item } from '../../types'
import Price from '../layout/Price'

const useStyles = createStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  column: {
    display: 'flex',
  },
}))

export default function CartItem({ id, amount, name, image, price }: Item) {
  const { classes } = useStyles()
  const dispatch = useAppDispatch()

  return (
    <Grid className={classes.root} columns={24} p="md">
      <Grid.Col span={24} sm={7}>
        <Card shadow="sm" radius="md">
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
      </Grid.Col>
      <Grid.Col span={11} sm={7} className={classes.column}>
        <Stack justify="space-between">
          <div>
            <Text weight={500} size="lg">
              {name}
            </Text>
            <Price value={price} />
          </div>
          <NumberInput
            label="Quantity"
            radius="md"
            value={amount}
            min={1}
            onChange={(value) => {
              if (value) dispatch(updateAmount({ id, amount: value }))
            }}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={1} sm={5} />
      <Grid.Col span={11} sm={5} className={classes.column}>
        <Stack justify="space-between" align="flex-end" style={{ flexGrow: 1 }}>
          <Price
            value={formatEther(parseEther(price).mul(amount))}
            weight={500}
            size="xl"
            px="md"
          />
          <Button
            leftIcon={<Icon icon="clarity:trash-solid" />}
            variant="subtle"
            onClick={() => dispatch(removeItem(id))}
          >
            Delete
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
