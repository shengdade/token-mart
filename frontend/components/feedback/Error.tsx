import { Icon } from '@iconify/react'
import { Alert, AlertProps } from '@mantine/core'

export default function Error({ children, ...props }: AlertProps) {
  return (
    <Alert
      color="red"
      icon={<Icon icon="bx:error-circle" fontSize={24} />}
      {...props}
    >
      {children}
    </Alert>
  )
}
