import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractConfig } from '../../config'

export default function useTotalSupply(id: string) {
  const [totalSupply, setTotalSupply] = useState<number>(0)

  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    args: id,
    watch: false,
  })

  useEffect(() => {
    if (totalSupplyData) {
      setTotalSupply(totalSupplyData.toNumber())
    }
  }, [totalSupplyData])

  return totalSupply
}
