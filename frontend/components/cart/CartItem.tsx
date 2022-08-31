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
import Image from 'next/image'
import Price from '../layout/Price'

interface CartItemProps {}

const useStyles = createStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  column: {
    display: 'flex',
  },
}))

export default function CartItem({}: CartItemProps) {
  const { classes } = useStyles()

  return (
    <Grid className={classes.root} columns={24} p="md">
      <Grid.Col span={24} sm={7}>
        <Card shadow="sm" radius="md">
          <Card.Section>
            <AspectRatio ratio={2800 / 2100}>
              <Image src="/images/1.png" layout="fill" alt="Image" />
            </AspectRatio>
          </Card.Section>
        </Card>
      </Grid.Col>
      <Grid.Col span={11} sm={7} className={classes.column}>
        <Stack justify="space-between">
          <div>
            <Text weight={500} size="lg">
              Sword
            </Text>
            <Price value={1.01} />
          </div>
          <NumberInput
            label="Quantity"
            radius="md"
            defaultValue={1}
            min={1}
            max={1000}
          />
        </Stack>
      </Grid.Col>
      <Grid.Col span={1} sm={5} />
      <Grid.Col span={11} sm={5} className={classes.column}>
        <Stack justify="space-between" align="flex-end" style={{ flexGrow: 1 }}>
          <Price value={1.01} weight={500} size="xl" px="md" />
          <Button
            leftIcon={<Icon icon="clarity:trash-solid" />}
            variant="subtle"
          >
            Delete
          </Button>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}
