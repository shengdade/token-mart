import { AppShell, Container } from '@mantine/core'
import AppHeader from '../AppHeader'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
      <Container size="lg">{children}</Container>
    </AppShell>
  )
}
