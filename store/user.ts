import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../types'
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
  isCelebrity: false
}

export const { actions, ...userSlice } = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    getUser (
      state,
      { payload }: PayloadAction<User>
    ):User {
      return payload
    },
    updateUser (
      state,
      { payload }: PayloadAction<User>
    ):User {
      return { ...state, ...payload }
    },
    clearUser ():User {
      return initState
    }
  }
})

const login = (email:string, password:string) => async (dispatch:any) => {
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

const signup = (email:string, password:string) => async (dispatch:any) => {
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

const update = (data:User) => async (dispatch:any, getState:()=>AppState) => {
  dispatch(loaderActions.loading('authLoader'))
  const { imageUrl } = getState().user
  const { imageUrl: img, id } = data
  if (img && (imageUrl !== img)) {
    const blob = await HelperService.parseToBlob(img)
    const uri = await HelperService.generateBlobUrl(`user/${id}`, blob)
    data = { ...data, imageUrl: uri }
  }
  const user = await UserService.updateUser(data)
  user && dispatch(actions.getUser({ ...user, profileUpdated: true }))
  dispatch(loaderActions.loaded('authLoader'))
}

const updateProfile = (data:User) => (dispatch:any) => {
  dispatch(actions.updateUser(data))
}

export const userActions = {
  login,
  signup,
  signout,
  update,
  updateProfile
}
