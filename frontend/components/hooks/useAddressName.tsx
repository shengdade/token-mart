import { useEffect, useState } from 'react'
import { useEnsName } from 'wagmi'

export default function useAddressName(address: string) {
  const [addressName, setAddressName] = useState<string>(
    address.substring(2, 8)
  )

  const { data } = useEnsName({
    address,
    chainId: 1, // mainnet
  })

  useEffect(() => {
    if (data) {
      setAddressName(data)
    }
  }, [data])

  return addressName
}
