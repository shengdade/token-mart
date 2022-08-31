import { AspectRatio, Card, createStyles, Group, Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'
import Label from '../layout/Label'
import Price from '../layout/Price'

interface CollectableCardProps {
  id: number
}

const useStyles = createStyles((theme) => ({}))

export default function CollectableCard({ id }: CollectableCardProps) {
  const { classes } = useStyles()

  return (
    <Link href={`/collectable/${id}`} passHref>
      <Card shadow="sm" radius="md" withBorder component="a">
        <Card.Section>
          <AspectRatio ratio={2800 / 2100}>
            <Image src={`/images/${id}.png`} layout="fill" alt="Image" />
          </AspectRatio>
        </Card.Section>

        <Text size="sm" weight={500} my="xs">
          Sword
        </Text>

        <Group position="apart">
          <Label label="Price">
            <Price value={1.01} weight={500} size="sm" />
          </Label>
          <Label label="Available">
            <Text weight={500} size="sm">
              {10}
            </Text>
          </Label>
        </Group>
      </Card>
    </Link>
  )
}
