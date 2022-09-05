export interface Metadata {
  name: string
  description: string
  image: string
}

export interface Item {
  id: string
  amount: number
  name: string
  image: string
  price: string
}

export interface TransactionError extends Error {
  reason: string
  code: string
  method: string
  transaction: {
    from: string
    to: string
    value: {
      type: string
      hex: string
    }
    data: string
  }
}
