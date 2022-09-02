import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { contractConfig, OWNER } from '../../config'

export default function useStock(id: string) {
  const [stock, setStock] = useState<number>(0)

  const { data: stockData } = useContractRead({
    ...contractConfig,
    functionName: 'balanceOf',
    args: [OWNER, id],
    watch: false,
  })

  useEffect(() => {
    if (stockData) {
      setStock(stockData.toNumber())
    }
  }, [stockData])

  return stock
}
