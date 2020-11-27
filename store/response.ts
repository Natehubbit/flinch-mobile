import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import ResponseService from '../services/ResponseService'
import { ApprovedActionPayload, ResponseState } from '../types'
import { loaderActions } from './loader'

const initState: ResponseState = {
  approved: [],
  rejected: [],
  all: []
}

export const { actions, ...responseSlice } = createSlice({
  name: 'response',
  initialState: initState,
  reducers: {
    getResponse (
      state,
      { payload }: PayloadAction<ApprovedActionPayload>
    ) {
      const { key, data } = payload
      return { ...state, [key]: data }
    },
    resetResponse ():ResponseState {
      return initState
    }
  }
})

const getApproved = (id:string, callback?:()=>void) => async (dispatch:Dispatch) => {
  dispatch(loaderActions.loading('videosResponseLoader'))
  const data = await ResponseService.getApproved(id)
  data && dispatch(actions.getResponse({ key: 'approved', data }))
  dispatch(loaderActions.loaded('videosResponseLoader'))
  callback && callback()
}

const reloadApproved = (id:string, callback?:()=>void) => async (dispatch:Dispatch) => {
  const data = await ResponseService.getApproved(id)
  data && dispatch(actions.getResponse({ key: 'approved', data }))
  callback && callback()
}

export const responseActions = {
  ...actions,
  getApproved,
  reloadApproved
}
