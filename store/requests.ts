import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { AppState } from '.'
import RequestService from '../services/RequestService'
import { Request } from '../types'
import { loaderActions } from './loader'
import { responseActions } from './response'

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
    },
    clearRequests () {
      return initState
    }
  }
})

const getAllRequests = () => async (
  dispatch:Dispatch,
  getState:()=>AppState
) => {
  dispatch(loaderActions.loading('requestsLoader'))
  const { role, ...user } = getState().user
  const isUser = role === 'user'
  const id = isUser
    ? user.id
    : user.celebrity.id
  const res = await RequestService.getAllRequests(id)
  res && dispatch(actions.getRequests(res))
  dispatch(loaderActions.loaded('requestsLoader'))
}

const reloadRequests = (callback?:()=>void) => async (
  dispatch:Dispatch,
  getState:()=>AppState
) => {
  const { role, ...user } = getState().user
  const isUser = role === 'user'
  const id = isUser
    ? user.id
    : user.celebrity.id
  const res = await RequestService.getAllRequests(id)
  res && dispatch(actions.getRequests(res))
  callback && callback()
}

const rejectRequest = (id:string, callback?:()=>void) => async (dispatch:Dispatch, getState:()=>AppState) => {
  const { requests, user: { role } } = getState()
  if (role === 'user') return
  const rejected = await RequestService.rejectRequest(id)
  const data = rejected && requests.filter(d => d.id !== id)
  data && dispatch(actions.getRequests(data))
  callback && callback()
}

const approveRequest = (id:string, uri:string, callback?:()=>void) =>
  async (dispatch:Dispatch, getState:()=>AppState) => {
    const {
      requests,
      user: {
        role,
        celebrity: {
          id: userId
        }
      }
    } = getState()
    if (role === 'user') return
    const loading = () => dispatch(
      loaderActions.loading('responseLoader')
    )
    const approved = await RequestService
      .approveRequest(
        id,
        uri,
        loading
      )
    if (approved) {
      const data = requests.map(d => {
        if (d.id === id) {
          return { ...d, ...approved }
        }
        return d
      })
      dispatch(actions.getRequests(data))
      dispatch<any>(responseActions.reloadApproved(userId))
      callback && callback()
    } else {
      Alert.alert(
        'Error',
        'Failed to upload Video. Please try again.',
        [
          { text: 'Okay', style: 'cancel' }
        ]
      )
    }
  }

export const requestsActions = {
  ...actions,
  rejectRequest,
  getAllRequests,
  approveRequest,
  reloadRequests
}
