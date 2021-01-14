import {
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit'
import { Toast } from '../types'

const initState: Toast = {
  show: false,
  msg: '',
  label: '',
  mode: 'default',
  duration: 7000,
  onDismiss: undefined,
  onPress: undefined
}

export const {
  actions,
  ...toastSlice
} = createSlice({
  name: 'toast',
  initialState: initState,
  reducers: {
    setToast(
      state,
      { payload }: PayloadAction<Toast>
    ) {
      return { ...state, ...payload }
    },
    resetToast(): Toast {
      return initState
    }
  }
})

// const setToast: (val:Toast) => void =
//   (data) => async (dispatch:Dispatch) => {
//     dispatch(actions.setToast(val))
//   }

export const toastActions = {
  ...actions
}
