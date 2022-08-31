import { MantineNumberSize, Text } from '@mantine/core'

interface LabelProps {
  label: string
  size?: MantineNumberSize
  children: React.ReactNode
}

export default function Label({ label, size = 'xs', children }: LabelProps) {
  return (
    <div>
      <Text size={size} color="dimmed">
        {label}
      </Text>
      {children}
    </div>
  )
}
