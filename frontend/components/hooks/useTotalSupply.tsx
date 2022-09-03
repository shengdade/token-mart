import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractConfig } from '../../config'

export default function useTotalSupply(id: string) {
  const [totalSupply, setTotalSupply] = useState<number>(0)

  const { data } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    args: id,
    watch: false,
  })

  useEffect(() => {
    if (data) {
      setTotalSupply(data.toNumber())
    }
  }, [data])

  return totalSupply
}
