import { useSelector } from '../store'
import { ResponseState } from '../types'

export const useResponse = (
  status: keyof ResponseState
) =>
  useSelector((state) => {
    return state.response[status]
  })
