import { Icon } from '@iconify/react'
import { Alert, AlertProps } from '@mantine/core'

export default function Warning({ children, ...props }: AlertProps) {
  return (
    <Alert
      color="orange"
      icon={<Icon icon="bx:error" fontSize={24} />}
      {...props}
    >
      {children}
    </Alert>
  )
}
