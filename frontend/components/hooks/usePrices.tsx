import { formatEther } from 'ethers/lib/utils'
import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { ALL_TOKEN_IDS, contractConfig } from '../../config'

export default function usePrices() {
  const [prices, setPrices] = useState<string[]>()

  const { data: pricesData } = useContractRead({
    ...contractConfig,
    functionName: 'priceOfBatch',
    args: [ALL_TOKEN_IDS],
    watch: false,
  })

  useEffect(() => {
    if (pricesData) {
      setPrices(pricesData.map((price) => formatEther(price)))
    }
  }, [pricesData])

  return prices
}
