import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { User, UserResponse } from '../types'
import AuthService from '../services/AuthService'
import { loaderActions } from './loader'
import UserService from '../services/UserService'
import { AppState } from '.'
import HelperService from '../services/HelperService'

const initState: User = {
  id: '',
  displayName: '',
  email: '',
  imageUrl: '',
  loggedIn: false,
  profileUpdated: false,
  role: 'user',
  isCelebrity: false,
  token: null
}

export const { actions, ...userSlice } = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    getUser (
      state,
      { payload }: PayloadAction<UserResponse>
    ):User {
      return { ...state, ...payload }
    },
    updateUser (
      state,
      { payload }: PayloadAction<UserResponse>
    ):User {
      return { ...state, ...payload }
    },
    clearUser ():User {
      return initState
    }
  }
})

const login = (
  email:string,
  password:string
) => async (
  dispatch:Dispatch
) => {
  dispatch(loaderActions.loading('authLoader'))
  const user = await AuthService.login(email, password)
  const userData = user && await UserService.getUser(user.id)
  userData && dispatch(actions.getUser({
    id: '',
    displayName: '',
    email: '',
    imageUrl: '',
    isCelebrity: false,
    role: 'user',
    loggedIn: true,
    profileUpdated: true,
    ...userData
  }))
  dispatch(loaderActions.loaded('authLoader'))
}

const signup = (
  email:string,
  password:string
) => async (
  dispatch:Dispatch
) => {
  dispatch(loaderActions.loading('authLoader'))
  const user = await AuthService.signUp(email, password)
  const userData = user && await UserService.addUser(user)
  userData && dispatch(actions.getUser({ ...userData, loggedIn: true }))
  dispatch(loaderActions.loaded('authLoader'))
}

const signout = () => async (dispatch:any) => {
  dispatch(loaderActions.loading('authLoader'))
  const isSignedOut = await AuthService.signout()
  isSignedOut && dispatch(actions.clearUser())
  dispatch(loaderActions.loaded('authLoader'))
}

const update = (
  data:UserResponse,
  pass?:string
) => async (
  dispatch:Dispatch,
  getState:()=>AppState
) => {
  dispatch(loaderActions.loading('authLoader'))
  const { imageUrl, email: mail } = getState().user
  const { imageUrl: img, id } = data
  if (img && (imageUrl !== img)) {
    const blob = await HelperService
      .parseToBlob(img)
    const uri = await HelperService
      .generateBlobUrl(`user/${id}`, blob)
    data = { ...data, imageUrl: uri }
  }
  if (data.email && pass) {
    const auth = await AuthService
      .login(mail, pass)
    const updated = auth && await AuthService
      .updateAuthEmail(data.email)
    const user = updated && await UserService
      .update(data)
    user && dispatch(actions
      .getUser({ ...user, profileUpdated: true }))
  } else {
    const updated = await UserService
      .update(data)
    updated && dispatch(actions
      .getUser({ ...updated, profileUpdated: true }))
  }
  dispatch(loaderActions.loaded('authLoader'))
}

const updateProfile = (data:UserResponse) => (dispatch:Dispatch) => {
  dispatch(actions.updateUser(data))
}

export const userActions = {
  login,
  signup,
  signout,
  update,
  updateProfile
}
