import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { contractConfig } from '../../config'

export default function useBalance(id: string) {
  const [balance, setBalance] = useState<number>(0)
  const { address } = useAccount()

  const { data: balanceData } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [address, id],
    watch: false,
  })

  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.toNumber())
    }
  }, [balanceData])

  return balance
}
