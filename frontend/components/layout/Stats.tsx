import { Icon } from '@iconify/react'
import { Card, createStyles, Group, Text } from '@mantine/core'

interface StatsProps {
  title: string
  icon: string
  value: string | number
}

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  value: {
    fontWeight: 700,
    fontSize: 24,
  },
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },
}))

export default function Stats({ title, icon, value }: StatsProps) {
  const { classes } = useStyles()

  return (
    <Card withBorder p="md" radius="md">
      <Group position="apart">
        <Text size="xs" color="dimmed" className={classes.title}>
          {title}
        </Text>
        <Icon className={classes.icon} icon={icon} fontSize={20} />
      </Group>
      <Text mt={24} className={classes.value}>
        {value}
      </Text>
    </Card>
  )
}
