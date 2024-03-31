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
        incrementQuantity(state, action: PayloadAction<CartItem>) {
            const item = state.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity++;
            }
            else 
            {
                state.push(action.payload);
            }
        },
        decrementQuantity(state, action: PayloadAction<CartItem>) {
            const item = state.find(item => item.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity--;
            }
            else
            {
              const index = state.findIndex(item => item.id === action.payload.id);
                state.splice(index, 1)
            }
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