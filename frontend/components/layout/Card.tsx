import { Icon } from '@iconify/react'
import { Card, Group, Text } from '@mantine/core'

interface CardLayoutProps {
  icon: string
  title: string
  children: React.ReactNode
}

export default function CardLayout({ icon, title, children }: CardLayoutProps) {
  return (
    <Card withBorder radius="md" shadow="sm">
      <Card.Section p="lg" withBorder>
        <Group spacing="xs">
          <Icon icon={icon} fontSize={24} />
          <Text size="lg" weight={500}>
            {title}
          </Text>
        </Group>
      </Card.Section>
      <Card.Section p="lg">{children}</Card.Section>
    </Card>
  )
}
