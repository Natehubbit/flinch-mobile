import {
  createSlice,
  Dispatch,
  PayloadAction
} from '@reduxjs/toolkit'
import RequestService from '../services/RequestService'
import { Request } from '../types'
import { loaderActions } from './loader'

export const initState: Request = {
  id: '',
  celebrity: {
    id: '',
    name: ''
  },
  response: {
    status: 'pending',
    videoUri: '',
    thumbnailUri: '',
    duration: 0,
    timestamp: 0
  },
  payment: {
    id: '',
    amount: 0,
    payed: false,
    currency: 'GHS',
    trxRef: '',
    timestamp: Date.now()
  },
  requestor: {
    id: '',
    name: ''
  },
  instructions: '',
  occasion: '',
  recipient: '',
  status: 'pending',
  price: {
    amount: 0,
    currency: 'GHS'
  },
  timestamp: 0
}

export const {
  actions,
  ...requestSlice
} = createSlice({
  name: 'request',
  initialState: initState,
  reducers: {
    getRequest(
      state,
      { payload }: PayloadAction<Request>
    ): Request {
      return { ...state, ...payload }
    },
    clearRequest(): Request {
      return initState
    }
  }
})

const createRequest = (data: Request) => async (
  dispatch: Dispatch
) => {
  dispatch(loaderActions.loading('bookingLoader'))
  const res = await RequestService.createRequest(
    data
  )
  res && dispatch(actions.getRequest(res))
  dispatch(loaderActions.loaded('bookingLoader'))
}

export const requestActions = {
  createRequest,
  ...actions
}
