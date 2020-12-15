import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '.'
import NotificationService from '../services/NotificationService'
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
  const { id, token } = getState().user
  if (!token) {
    const tkn = await NotificationService.getToken()
    dispatch(userActions.updateProfile({ id, token: tkn }) as any)
  }
}

export const notificationsActions = {
  ...actions,
  getDeviceToken
}
