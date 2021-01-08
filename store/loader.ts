import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppLoader, LoaderString } from '../types'

const initState: AppLoader = {
  authLoader: false,
  celebsLoader: false,
  bookingLoader: false,
  paymentLoader: false,
  requestsLoader: false,
  responseLoader: false,
  videosResponseLoader: false
}

export const { actions, ...loaderSlice } = createSlice({
  name: 'loader',
  initialState: initState,
  reducers: {
    loading (
      state,
      { payload }: PayloadAction<LoaderString>
    ): AppLoader {
      return { ...state, [payload]: true }
    },
    loaded (
      state,
      { payload }: PayloadAction<LoaderString>
    ): AppLoader {
      return { ...state, [payload]: false }
    },
    resetLoaders (): AppLoader {
      return initState
    }
  }
})

export const loaderActions = {
  ...actions
}
