/* eslint-disable no-unused-vars */
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  useSelector as nativeUseSelector,
  TypedUseSelectorHook
} from 'react-redux'
import { celebsSlice } from './celebs'
import { loaderSlice } from './loader'
import { persistStore, persistReducer, PersistConfig } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'
import { userSlice } from './user'
import { requestSlice } from './request'
import { requestsSlice } from './requests'
import { toastSlice } from './toast'
import { responseSlice } from './response'

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [loaderSlice.name]: loaderSlice.reducer,
  [celebsSlice.name]: celebsSlice.reducer,
  [requestSlice.name]: requestSlice.reducer,
  [requestsSlice.name]: requestsSlice.reducer,
  [toastSlice.name]: toastSlice.reducer,
  [responseSlice.name]: responseSlice.reducer
})

const persistConfig:PersistConfig<unknown, any, any, any> = {
  key: 'root',
  blacklist: ['loader', 'toast'],
  storage: AsyncStorage,
  timeout: 10000
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<AppState> = nativeUseSelector
