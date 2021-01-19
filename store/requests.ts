import {
  createSlice,
  Dispatch,
  PayloadAction
} from '@reduxjs/toolkit'
import { Alert } from 'react-native'
import { AppState } from '.'
import RequestService from '../services/RequestService'
import {
  Loader,
  LoaderString,
  Request
} from '../types'
import { loaderActions } from './loader'
import { responseActions } from './response'
import { toastActions } from './toast'

const initState: Request[] = []

export const {
  actions,
  ...requestsSlice
} = createSlice({
  name: 'requests',
  initialState: initState,
  reducers: {
    getRequests(
      state,
      { payload }: PayloadAction<Request[]>
    ): Request[] {
      return payload
    },
    clearRequests() {
      return initState
    }
  }
})

const getAllRequests = () => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(
    loaderActions.loading('requestsLoader')
  )
  const { role, ...user } = getState().user
  const isUser = role === 'user'
  const id = isUser ? user.id : user.celebrity.id
  if (isUser) {
    const res = await RequestService.getAllRequests(
      id
    )
    res && dispatch(actions.getRequests(res))
  } else {
    const res = await RequestService.getCelebRequests(
      id
    )
    res && dispatch(actions.getRequests(res))
  }
  dispatch(loaderActions.loaded('requestsLoader'))
}

const reloadRequests = (
  callback?: () => void
) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { role, ...user } = getState().user
  const isUser = role === 'user'
  const id = isUser ? user.id : user.celebrity.id
  if (isUser) {
    const res = await RequestService.getAllRequests(
      id
    )
    res && dispatch(actions.getRequests(res))
  } else {
    const res = await RequestService.getCelebRequests(
      id
    )
    res && dispatch(actions.getRequests(res))
  }
  callback && callback()
}

const rejectRequest = (
  id: string,
  callback?: () => void
) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const {
    requests,
    user: { role }
  } = getState()
  if (role === 'user') return
  const rejected = await RequestService.rejectRequest(
    id
  )
  const data =
    rejected &&
    requests.filter((d) => d.id !== id)
  !!data && dispatch(actions.getRequests(data))
  callback && callback()
}

const approveRequest = (
  id: string,
  uri: string,
  callback?: () => void
) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const {
    requests,
    user: {
      role,
      celebrity: { id: userId }
    }
  } = getState()
  if (role === 'user') return
  dispatch(
    loaderActions.loading('responseLoader')
  )
  const updateLoader = (data: {
    key: LoaderString
    data: Loader
  }) => {
    dispatch(loaderActions.update(data))
  }
  const approved = await RequestService.approveRequest(
    id,
    uri,
    updateLoader
  )
  if (approved) {
    dispatch(toastActions.setToast({
      label: 'Okay',
      msg: 'Request approved',
      show: true
    }))
    const data = requests.map((d) => {
      if (d.id === id) {
        return { ...d, ...approved }
      }
      return d
    })
    dispatch(actions.getRequests(data))
    dispatch<any>(
      responseActions.reloadApproved(userId)
    )
    callback && callback()
  } else {
    Alert.alert(
      'Error',
      'Failed to upload Video. Please try again.',
      [{ text: 'Okay', style: 'cancel' }]
    )
  }
}

const listenForPending = (
  dataCallback: (val: Request[]) => void,
  callback: any
) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const {
    role,
    id: userId,
    celebrity: { id: celebId }
  } = getState().user
  const isUser = role === 'user'
  const id = isUser ? userId : celebId
  const loading = () =>
    dispatch(
      loaderActions.loading('requestsLoader')
    )
  const loaded = () =>
    dispatch(
      loaderActions.loaded('requestsLoader')
    )
  const unsub = RequestService.pendingListener(
    id,
    isUser,
    dataCallback,
    loading,
    loaded
  )
  callback && callback(unsub)
}

export const requestsActions = {
  ...actions,
  rejectRequest,
  getAllRequests,
  approveRequest,
  reloadRequests,
  listenForPending
}
