import {
  createSlice,
  Dispatch,
  PayloadAction
} from '@reduxjs/toolkit'
import { User, UserResponse } from '../types'
import AuthService from '../services/AuthService'
import { loaderActions } from './loader'
import UserService from '../services/UserService'
import { AppState } from '.'
import HelperService from '../services/HelperService'
import { notificationsActions } from './notifications'
import { celebsActions } from './celebs'
import { requestActions } from './request'
import { requestsActions } from './requests'
import CelebService from '../services/CelebService'
import NotificationService from '../services/NotificationService'

const initState: User = {
  id: '',
  displayName: '',
  email: '',
  imageUrl: '',
  loggedIn: false,
  profileUpdated: false,
  celebrity: {
    isCeleb: false,
    id: ''
  },
  role: 'user',
  token: null
}

export const {
  actions,
  ...userSlice
} = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    getUser(
      state,
      { payload }: PayloadAction<UserResponse>
    ): User {
      return { ...state, ...payload }
    },
    updateUser(
      state,
      { payload }: PayloadAction<UserResponse>
    ): User {
      return { ...state, ...payload }
    },
    clearUser(): User {
      return initState
    }
  }
})

const login = (
  email: string,
  password: string
) => async (dispatch: Dispatch) => {
  dispatch(loaderActions.loading('authLoader'))
  const user = await AuthService.login(
    email,
    password
  )
  const token = await NotificationService.getToken()
  const userData =
    user && (await UserService.getUser(user.id))
  userData &&
    (await UserService.update({
      id: userData.id,
      token: token || ''
    }))
  const { isCeleb } = userData?.celebrity || {
    isCeleb: false,
    id: ''
  }
  isCeleb &&
    (await CelebService.updateCeleb({
      id: userData.celebrity.id,
      token: token || ''
    }))

  userData &&
    dispatch(
      actions.getUser({
        id: '',
        displayName: '',
        email: '',
        imageUrl: '',
        role: 'user',
        loggedIn: true,
        profileUpdated: true,
        ...userData,
        token: token || {
          data: '',
          type: 'expo'
        }
      })
    )
  dispatch(loaderActions.loaded('authLoader'))
}

const signup = (
  password: string,
  data: Partial<User>,
  callback?: ()=>void
) => async (dispatch: Dispatch) => {
  dispatch(loaderActions.loading('authLoader'))
  const user = await AuthService.signUp(
    data.email,
    password
  )
  const token = await NotificationService.getToken()
  const hasImage = !!data.imageUrl
  if (hasImage) {
    const blob = await HelperService
      .parseToBlob(
        data.imageUrl
      )
    const uri = blob && !!user.id && await HelperService
      .generateBlobUrl(
        `user/${user.id}`,
        blob
      )
    const userData =
      user && (await UserService
        .addUser({
          ...user,
          ...data,
          celebrity: {
            id: '',
            isCeleb: false
          },
          imageUrl: uri || '',
          token
        }))
    userData &&
      dispatch(
        actions.getUser({
          ...userData,
          profileUpdated: true,
          token: token || '',
          loggedIn: true
        })
      )
  }
  callback && callback()
  dispatch(loaderActions.loaded('authLoader'))
}

const signout = () => async (dispatch: any) => {
  dispatch(loaderActions.loading('authLoader'))
  const isSignedOut = await AuthService.signout()
  isSignedOut && dispatch(resetApp(true))
  dispatch(loaderActions.loaded('authLoader'))
}

const update = (
  data: UserResponse,
  pass?: string
) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch(loaderActions.loading('authLoader'))
  const {
    imageUrl,
    email: mail
  } = getState().user
  const { imageUrl: img, id } = data
  if (img && imageUrl !== img) {
    const blob = await HelperService.parseToBlob(
      img
    )
    const uri = await HelperService.generateBlobUrl(
      `user/${id}`,
      blob
    )
    data = { ...data, imageUrl: uri }
  }
  if (data.email && pass) {
    const auth = await AuthService.login(
      mail,
      pass
    )
    const updated =
      auth &&
      (await AuthService.updateAuthEmail(
        data.email
      ))
    const user =
      updated && (await UserService.update(data))
    user &&
      dispatch(
        actions.getUser({
          ...user,
          profileUpdated: true
        })
      )
  } else {
    const updated = await UserService.update(data)
    updated &&
      dispatch(
        actions.getUser({
          ...updated,
          profileUpdated: true
        })
      )
  }
  dispatch(loaderActions.loaded('authLoader'))
}

const updateProfile = (data: UserResponse) => (
  dispatch: Dispatch
) => {
  dispatch(actions.updateUser(data))
}

const resetApp = (clearUser?: boolean) => (
  dispatch: Dispatch
) => {
  clearUser && dispatch(userActions.clearUser())
  dispatch(loaderActions.resetLoaders())
  dispatch(
    notificationsActions.clearNotifications()
  )
  dispatch(celebsActions.clearCelebs())
  dispatch(requestActions.clearRequest())
  dispatch(requestsActions.clearRequests())
}

const switchUserRole = () => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { role, ...user } = getState().user
  const isUser = role === 'user'
  if (isUser) {
    const { id } = user.celebrity
    const data = await CelebService.getCeleb(id)
    if (data) {
      dispatch(
        actions.getUser({
          role: 'celebrity',
          celebrity: {
            ...user.celebrity,
            data
          }
        }) as any
      )
      dispatch(resetApp() as any)
    }
  } else {
    const { id } = user
    const data = await UserService.getUser(id)
    if (data) {
      dispatch(resetApp() as any)
      dispatch(
        actions.getUser({
          ...data,
          role: 'user'
        }) as any
      )
    }
  }
}

export const userActions = {
  ...actions,
  login,
  signup,
  signout,
  update,
  updateProfile,
  resetApp,
  switchUserRole
}
