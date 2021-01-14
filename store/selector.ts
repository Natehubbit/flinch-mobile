import {
  createSlice,
  PayloadAction,
  Dispatch
} from '@reduxjs/toolkit'
import { AppState } from '.'
import { Selector } from '../types'

const initState: Selector = {
  title: 'Choose an option',
  show: false,
  options: [],
  value: '',
  onSelect: () => {}
}

export const {
  actions,
  ...selectorSlice
} = createSlice({
  name: 'selector',
  initialState: initState,
  reducers: {
    setSelector(
      state,
      {
        payload
      }: PayloadAction<Partial<Selector>>
    ) {
      return { ...state, ...payload }
    },
    resetSelector() {
      return initState
    }
  }
})

const openSelector = (
  options: string[],
  selectorTitle?: string,
  val?: string,
  onSelect?: () => void
) => (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const {
    selector: { title, value }
  } = getState()
  dispatch(
    actions.setSelector({
      title: selectorTitle || title,
      value: val || value,
      show: true,
      options,
      onSelect: onSelect || null
    })
  )
}

const closeSelector = () => (
  dispatch: Dispatch
) => {
  dispatch(actions.resetSelector())
}

export const selectorActions = {
  ...actions,
  openSelector,
  closeSelector
}
