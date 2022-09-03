import { Icon } from '@iconify/react'
import {
  ActionIcon,
  Container,
  createStyles,
  Group,
  Header,
  Indicator,
} from '@mantine/core'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import Link from 'next/link'
import ColorSchemeToggle from './ColorSchemeToggle'

const HEADER_HEIGHT = 60

const useStyles = createStyles((theme) => ({
  root: {
    borderBottom: 'none',
    background:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[8]
        : theme.colors.gray[1],
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
}))

export default function AppHeader() {
  const { classes } = useStyles()

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header} size="lg">
        <Link href="/">
          <a>
            <Image src={'/logo.png'} alt="logo" height={40} width={40} />
          </a>
        </Link>
        <Group spacing="lg">
          <ColorSchemeToggle />
          <Link href="/wallet" passHref>
            <ActionIcon color="dark" component="a">
              <Icon icon="fluent:wallet-24-filled" fontSize={40} />
            </ActionIcon>
          </Link>
          <Link href="/cart" passHref>
            <Indicator label="5" size={16}>
              <ActionIcon color="dark" component="a">
                <Icon icon="ic:round-shopping-cart" fontSize={40} />
              </ActionIcon>
            </Indicator>
          </Link>
          <ConnectButton chainStatus="none" />
        </Group>
      </Container>
    </Header>
  )
}
