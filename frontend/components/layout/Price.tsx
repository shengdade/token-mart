import { Icon } from '@iconify/react'
import { Group, Text, TextProps } from '@mantine/core'

interface PriceProps extends TextProps {
  value: number | string
}

export default function Price({ value, ...props }: PriceProps) {
  return (
    <Text {...props}>
      <Group spacing="xs">
        <Icon icon="logos:ethereum" />
        <span>{value}</span>
      </Group>
    </Text>
  )
}
