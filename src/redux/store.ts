import { configureStore, combineReducers } from '@reduxjs/toolkit'
import homeReducer from '~/redux/slices/homeSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  home: homeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

export const persistor = persistStore(store)
export { store }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
