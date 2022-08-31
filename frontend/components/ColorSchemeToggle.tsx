import { Icon } from '@iconify/react'
import { ActionIcon, useMantineColorScheme } from '@mantine/core'

export default function ColorSchemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon onClick={() => toggleColorScheme()} color="dark">
      {colorScheme === 'dark' ? (
        <Icon icon="akar-icons:sun-fill" fontSize={40} />
      ) : (
        <Icon icon="akar-icons:moon-fill" fontSize={40} />
      )}
    </ActionIcon>
  )
}
