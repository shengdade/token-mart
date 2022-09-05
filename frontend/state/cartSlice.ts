import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Item } from '../types'
import type { AppState } from './store'

export interface CartState {
  items: Item[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Item>) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.amount += action.payload.amount
      } else {
        state.items.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const items = state.items.filter((item) => item.id !== action.payload)
      state.items = items
    },
    updateAmount: (
      state,
      action: PayloadAction<Pick<Item, 'id' | 'amount'>>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id)
      if (item) {
        item.amount = action.payload.amount
      }
    },
  },
})

export const { addItem, removeItem, updateAmount } = cartSlice.actions

export const selectCount = (state: AppState) => state.cart.items.length

export const selectItems = (state: AppState) => state.cart.items

export default cartSlice.reducer
