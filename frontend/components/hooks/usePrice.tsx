import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractConfig } from '../../config'

export default function usePrice(id: string) {
  const [price, setPrice] = useState<string>('')

  const { data: priceData } = useContractRead({
    ...contractConfig,
    functionName: 'priceOf',
    args: id,
    watch: false,
  })

  useEffect(() => {
    if (priceData) {
      setPrice(formatEther(priceData))
    }
  }, [priceData])

  return price
}
