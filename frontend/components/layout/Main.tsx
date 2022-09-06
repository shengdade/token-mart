import { AppShell, Container, Loader } from '@mantine/core'
import AppHeader from '../AppHeader'
import ChainSwitch from '../ChainSwitch'
import Warning from '../feedback/Warning'
import useChain from '../hooks/useChain'
import useConnect from '../hooks/useConnect'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isGoerli } = useChain()
  const { connected, connecting } = useConnect()

  return (
    <AppShell
      padding="md"
      header={<AppHeader />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[1],
        },
      })}
    >
      <Container size="lg">
        {connected ? (
          isGoerli ? (
            <>{children}</>
          ) : (
            <ChainSwitch />
          )
        ) : connecting ? (
          <Loader size="lg" />
        ) : (
          <Warning>Please connect your wallet.</Warning>
        )}
      </Container>
    </AppShell>
  )
}
