import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '.'
import RequestService from '../services/RequestService'
import { Request } from '../types'
import { loaderActions } from './loader'

const initState: Request[] = []

export const { actions, ...requestsSlice } = createSlice({
  name: 'requests',
  initialState: initState,
  reducers: {
    getRequests (
      state,
      { payload }: PayloadAction<Request[]>
    ): Request[] {
      return payload
    }
  }
})

const getAllRequests = (id:string) => async (dispatch:Dispatch) => {
  dispatch(loaderActions.loading('requestsLoader'))
  const res = await RequestService.getAllRequests(id)
  res && dispatch(actions.getRequests(res))
  dispatch(loaderActions.loaded('requestsLoader'))
}

const rejectRequest = (id:string, callback?:()=>void) => async (dispatch:Dispatch, getState:()=>AppState) => {
  const { requests } = getState()
  const res = await RequestService.rejectRequest(id)
  const data = res
    ? requests.filter(d => d.id !== id)
    : requests
  dispatch(actions.getRequests(data))
  callback && callback()
}

const approveRequest = (id:string, uri:string, duration:number, callback?:()=>void) =>
  async (dispatch:Dispatch, getState:()=>AppState) => {
    const { requests } = getState()
    const loading = () => dispatch(loaderActions.loading('responseLoader'))
    const res = await RequestService
      .approveRequest(
        id,
        uri,
        duration,
        loading
      )
    if (res) {
      const data = requests.map(d => {
        if (d.id === id) {
          return { ...d, ...res }
        }
        return d
      })
      dispatch(actions.getRequests(data))
      callback && callback()
    }
    dispatch(loaderActions.loaded('responseLoader'))
  }

export const requestsActions = {
  ...actions,
  rejectRequest,
  getAllRequests,
  approveRequest
}
