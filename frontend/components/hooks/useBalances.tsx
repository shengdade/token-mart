import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import { ALL_TOKEN_IDS, contractConfig } from '../../config'

export default function useBalances() {
  const [balances, setBalances] = useState<number[]>(Array(20).fill(0))
  const { address } = useAccount()

  const { data } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOfBatch',
    args: [Array(20).fill(address), ALL_TOKEN_IDS],
    watch: false,
  })

  useEffect(() => {
    if (data) {
      setBalances(data.map((balance) => balance.toNumber()))
    }
  }, [data])

  return balances
}
