import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '.'
import CelebService from '../services/CelebService'
import NotificationService from '../services/NotificationService'
import UserService from '../services/UserService'
import { Notification } from '../types'
import { userActions } from './user'

const initState: Notification[] = []

export const { actions, ...celebsSlice } = createSlice({
  name: 'notifications',
  initialState: initState,
  reducers: {
    getNotifications (
      state
    ): Notification[] {
      return state
    },
    updateNotifications (
      state,
      { payload }: PayloadAction<Notification>
    ): Notification[] {
      return [...state, payload]
    },
    clearNotifications ():Notification[] {
      return []
    }
  }
})

const getDeviceToken = () => async (
  dispatch: Dispatch,
  getState:()=>AppState
) => {
  const { id, token, celebrity: { isCeleb, id: celebId } } = getState().user
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

export const notificationsActions = {
  ...actions,
  getDeviceToken
}
