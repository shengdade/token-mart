import { Icon } from '@iconify/react'
import { Alert, AlertProps } from '@mantine/core'

export default function Success({ children, ...props }: AlertProps) {
  return (
    <Alert
      color="green"
      icon={<Icon icon="bx:check-circle" fontSize={24} />}
      {...props}
    >
      {children}
    </Alert>
  )
}
