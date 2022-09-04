import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractConfig } from '../../config'

export default function usePrice(id: string) {
  const [price, setPrice] = useState<string>('0')

  const { data } = useContractRead({
    ...contractConfig,
    functionName: 'priceOf',
    args: id,
    watch: false,
  })

  useEffect(() => {
    if (data) {
      setPrice(formatEther(data))
    }
  }, [data])

  return price
}
