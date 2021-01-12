import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '.'
import CelebService from '../services/CelebService'
import NotificationService from '../services/NotificationService'
import UserService from '../services/UserService'
import { NotificationMessage } from '../types'
import { loaderActions } from './loader'
import { userActions } from './user'

const initState: NotificationMessage[] = []

export const { actions, ...notificationsSlice } = createSlice({
  name: 'notifications',
  initialState: initState,
  reducers: {
    getNotifications (
      state,
      { payload }: PayloadAction<NotificationMessage[]>
    ): NotificationMessage[] {
      return payload
    },
    update (
      state,
      { payload }: PayloadAction<NotificationMessage>
    ): NotificationMessage[] {
      return [...state, payload]
    },
    clearNotifications ():NotificationMessage[] {
      return initState
    }
  }
})

const getDeviceToken = () => async (
  dispatch: Dispatch,
  getState:()=>AppState
) => {
  const {
    id,
    token,
    celebrity: {
      isCeleb,
      id: celebId
    }
  } = getState().user
  if (!token) {
    const tkn = await NotificationService.getToken()
    if (isCeleb) {
      const usr = getState().user
      const updatedCeleb = await CelebService
        .updateCeleb({
          id: celebId,
          token: tkn
        })
      updatedCeleb && dispatch(userActions
        .updateProfile({
          id,
          celebrity: {
            ...usr.celebrity,
            data: {
              ...usr.celebrity.data,
              token: tkn
            }
          }
        }) as any)
    } else {
      const updatedUser = await UserService.update({
        id,
        token: tkn
      })
      updatedUser && dispatch(userActions
        .updateProfile({
          id,
          token: tkn
        }) as any)
    }
  }
}

const getNotifications = () => async (
  dispatch:Dispatch,
  getState:()=>AppState
) => {
  dispatch(loaderActions.loading('requestsLoader'))
  const {
    id: userId,
    role,
    celebrity
  } = getState().user
  const isUser = role === 'user'
  const id = isUser
    ? userId
    : celebrity.id
  const data = await NotificationService.getNotifications(id)
  data && dispatch(actions.getNotifications(data))
  dispatch(loaderActions.loaded('requestsLoader'))
}

const listen = (
  data: NotificationMessage[]
) => async (
  dispatch:Dispatch
) => {
  dispatch(actions.getNotifications(data))
}

const update = (
  id: string,
  data: Partial<NotificationMessage>
) => async (
  dispatch:Dispatch,
  getState:()=>AppState
) => {
  const { notifications } = getState()
  const updated = await NotificationService
    .updateNotification(id, data)
  if (updated) {
    const updatedList = notifications
      .map(d => {
        if (d.id === id) {
          return { ...d, ...data }
        }
        return d
      })
    dispatch(actions.getNotifications(updatedList))
  }
}

export const notificationsActions = {
  ...actions,
  getDeviceToken,
  getNotifications,
  listen,
  update
}
