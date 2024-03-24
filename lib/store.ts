import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

type CartItem = {
    id: number
    quantity: number
}

const cartInitialState: CartItem[] = [];
const cartSlice = createSlice({
    name: "cart",
    initialState: cartInitialState,
    reducers: {
        addToCart(state, action: PayloadAction<CartItem>){
            state.push(action.payload);
        },
        removerFromCart(state, action: PayloadAction<CartItem>){

        }
    }
})

export const makeStore = () => {
  return configureStore({
    reducer: {
        cart: cartSlice.reducer
    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']