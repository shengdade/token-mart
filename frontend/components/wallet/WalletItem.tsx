import { AspectRatio, createStyles, Group, Text } from '@mantine/core'
import Image from 'next/image'

interface WalletItemProps {
  name: string
  image: string
  balance: number
}

const useStyles = createStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.colors.gray[2]}`,
  },
  image: {
    borderRadius: '4rem',
  },
}))

export default function WalletItem({ name, image, balance }: WalletItemProps) {
  const { classes } = useStyles()

  return (
    <Group className={classes.root} p="lg" grow>
      <AspectRatio ratio={2800 / 2100}>
        <Image
          className={classes.image}
          src={image.replace('ipfs://', 'https://ipfs.io/ipfs/')}
          layout="fill"
          alt="Image"
        />
      </AspectRatio>
      <Text weight={500} size={20} p="sm">
        {name}
      </Text>
      <Text weight={500} size={32} align="end" variant="gradient">
        x{balance}
      </Text>
    </Group>
  )
}
