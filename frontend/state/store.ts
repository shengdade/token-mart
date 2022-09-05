import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import cartReducer from './cartSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      counter: counterReducer,
      cart: cartReducer,
    },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
