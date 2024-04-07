import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

type CartItem = {
    id: string
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

const rootReducer = combineReducers({
    cart: cartSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
  })
}

export const makePersistor = (store: AppStore) => {
    return persistStore(store)
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']