import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'

export default function useConnect() {
  const [connected, setConnected] = useState<boolean>(false)
  const [connecting, setConnecting] = useState<boolean>(true)

  const { isConnected, isConnecting } = useAccount()

  useEffect(() => {
    setConnecting(isConnecting)
  }, [isConnecting])

  useEffect(() => {
    setConnected(isConnected)
  }, [isConnected])

  return { connected, connecting }
}
