import { AppShell, Container } from '@mantine/core'
import { useAccount } from 'wagmi'
import AppHeader from '../AppHeader'
import ChainSwitch from '../ChainSwitch'
import Warning from '../feedback/Warning'
import useChain from '../hooks/useChain'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isConnected } = useAccount()
  const { isGoerli } = useChain()

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
        {isConnected ? (
          isGoerli ? (
            <>{children}</>
          ) : (
            <ChainSwitch />
          )
        ) : (
          <Warning>Please connect your wallet.</Warning>
        )}
      </Container>
    </AppShell>
  )
}
