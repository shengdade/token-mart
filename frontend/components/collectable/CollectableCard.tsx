import { AspectRatio, Card, createStyles, Group, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import Label from '../layout/Label'
import Price from '../layout/Price'

interface CollectableCardProps {
  id: number
  name: string
  image: string
  price: string | number
  stock: number
}

const useStyles = createStyles((theme) => ({}))

export default function CollectableCard({
  id,
  name,
  image,
  price,
  stock,
}: CollectableCardProps) {
  const { classes } = useStyles()

  return (
    <Link href={`/collectable/${id}`} passHref>
      <Card shadow="sm" radius="md" withBorder component="a">
        <Card.Section>
          <AspectRatio ratio={2800 / 2100}>
            <Image
              src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
              layout="fill"
              alt="Image"
            />
          </AspectRatio>
        </Card.Section>

        <Text size="sm" weight={500} my="xs">
          {name}
        </Text>

        <Group position="apart">
          <Label label="Price">
            <Price value={price} weight={500} size="sm" />
          </Label>
          <Label label="Available">
            <Text weight={500} size="sm">
              {stock}
            </Text>
          </Label>
        </Group>
      </Card>
    </Link>
  )
}
