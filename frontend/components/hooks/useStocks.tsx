import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { ALL_TOKEN_IDS, ALL_TOKEN_OWNERS, contractConfig } from '../../config'

export default function useStocks() {
  const [stocks, setStocks] = useState<number[]>()

  const { data: stockData } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOfBatch',
    args: [ALL_TOKEN_OWNERS, ALL_TOKEN_IDS],
    watch: false,
  })

  useEffect(() => {
    if (stockData) {
      setStocks(stockData.map((stock) => stock.toNumber()))
    }
  }, [stockData])

  return stocks
}
