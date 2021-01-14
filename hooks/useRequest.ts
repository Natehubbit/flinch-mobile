import { useSelector } from '../store'

export const useRequest = () =>
  useSelector((state) => state.request)
