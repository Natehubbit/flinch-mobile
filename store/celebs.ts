import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CelebService, { Celebs } from '../services/CelebService'
import { loaderActions } from './loader'

const initState: Celebs = []

export const { actions, ...celebsSlice } = createSlice({
  name: 'celebs',
  initialState: initState,
  reducers: {
    getCelebs (
      state,
      { payload }: PayloadAction<Celebs>
    ) {
      return payload
    },
    clearCelebs ():Celebs {
      return []
    }
  }
})

const getCelebs = () => async (dispatch:any) => {
  dispatch(loaderActions.loading('celebsLoader'))
  const celebs = await CelebService.getCelebs()
  dispatch(actions.getCelebs(celebs))
  dispatch(loaderActions.loaded('celebsLoader'))
}

export const celebsActions = {
  ...actions,
  getCelebs
}
