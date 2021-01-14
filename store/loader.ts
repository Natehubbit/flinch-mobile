import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import {
  AppLoader,
  Loader,
  LoaderString
} from '../types'

const initState: AppLoader = {
  authLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  celebsLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  bookingLoader: {
    isLoading: false,
    body: null
  },
  paymentLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  requestsLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  responseLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  videosResponseLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  }
}

export const {
  actions,
  ...loaderSlice
} = createSlice({
  name: 'loader',
  initialState: initState,
  reducers: {
    loading(
      state,
      { payload }: PayloadAction<LoaderString>
    ): AppLoader {
      return {
        ...state,
        [payload]: {
          ...state[payload],
          isLoading: true
        }
      }
    },
    loaded(
      state,
      { payload }: PayloadAction<LoaderString>
    ): AppLoader {
      return {
        ...state,
        [payload]: {
          ...state[payload],
          isLoading: false
        }
      }
    },
    update(
      state,
      {
        payload
      }: PayloadAction<{
        key: LoaderString
        data: Loader
      }>
    ): AppLoader {
      const { key, data } = payload
      return {
        ...state,
        [key]: {
          ...state[key],
          ...data
        }
      }
    },
    resetLoaders(): AppLoader {
      return initState
    }
  }
})

export const loaderActions = {
  ...actions
}
