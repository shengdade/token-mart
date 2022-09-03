import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { ALL_TOKEN_IDS, contractConfig } from '../../config'

export default function useBalances() {
  const [balances, setBalances] = useState<number[]>()
  const { address } = useAccount()

  const { data: balanceData } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOfBatch',
    args: [Array(20).fill(address), ALL_TOKEN_IDS],
    watch: false,
  })

  useEffect(() => {
    if (balanceData) {
      setBalances(balanceData.map((balance) => balance.toNumber()))
    }
  }, [balanceData])

  return balances
}
