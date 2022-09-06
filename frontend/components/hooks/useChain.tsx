import { useEffect, useState } from 'react'
import { Chain, useNetwork } from 'wagmi'
import { GOERLI_NETWORK_ID } from '../../config'

export default function useChain() {
  const [chain, setChain] = useState<Chain>()

  const { chain: data } = useNetwork()

  const isGoerli = chain && chain.id === GOERLI_NETWORK_ID

  useEffect(() => {
    if (data) {
      setChain(data)
    }
  }, [data])

  return { chain, isGoerli }
}
