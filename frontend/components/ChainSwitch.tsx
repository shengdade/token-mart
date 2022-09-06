import { Button, Group, Stack, Text } from '@mantine/core'
import { useSwitchNetwork } from 'wagmi'
import { GOERLI_NETWORK_ID } from '../config'
import Error from './feedback/Error'
import Warning from './feedback/Warning'

export default function ChainSwitch() {
  const { error, isLoading, switchNetwork } = useSwitchNetwork()

  return (
    <Stack>
      <Warning>
        <Group spacing={4}>
          <Text>Please switch to Goerli.</Text>
          <Button
            variant="subtle"
            loading={isLoading}
            onClick={() => switchNetwork?.(GOERLI_NETWORK_ID)}
            disabled={!switchNetwork}
            p={0}
            sx={{ height: '1rem' }}
          >
            Switch Network
          </Button>
        </Group>
      </Warning>
      {error && <Error>{error?.message}</Error>}
    </Stack>
  )
}
