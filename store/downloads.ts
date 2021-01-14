import {
  createSlice,
  Dispatch,
  PayloadAction
} from '@reduxjs/toolkit'
import { AppState } from '.'
import HelperService from '../services/HelperService'
import {
  Download,
  UpdateDownloadActionPayload
} from '../types'

const initState: Download[] = []

export const {
  actions,
  ...downloadsSlice
} = createSlice({
  name: 'downloads',
  initialState: initState,
  reducers: {
    add(
      state,
      { payload }: PayloadAction<Download>
    ) {
      return [...state, payload]
    },
    update(
      state,
      { payload }: PayloadAction<Download>
    ) {
      return state.map((d) => {
        if (d.id === payload.id) {
          return payload
        }
        return d
      })
    },
    updateField(
      state,
      {
        payload
      }: PayloadAction<UpdateDownloadActionPayload>
    ) {
      const { id, key, val } = payload
      return state.map((d) => {
        if (d.id === id) {
          return { ...d, [key]: val }
        }
        return d
      })
    },
    clearDownloads() {
      return initState
    }
  }
})

const start = (
  id: string,
  url: string,
  ext: string
) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  const { downloads } = getState()
  const exists = downloads.find(
    (d) => d.id === id
  )
  if (!exists) {
    const callback = (progress: number) => {
      // dispatch(actions.updateField({
      //   id,
      //   key: 'progress',
      //   val: progress
      // }))
    }
    const download = HelperService.createDownload(
      id,
      url,
      ext,
      callback
    )
    dispatch(
      actions.add({
        ...download,
        state: 'downloading'
      })
    )
    const downloaded = await HelperService.downloadFile(
      id,
      url,
      ext,
      callback
    )
    downloaded &&
      dispatch(
        actions.update({
          ...downloaded,
          state: 'done'
        })
      )
  }
}

export const downloadActions = {
  ...actions,
  start
}
