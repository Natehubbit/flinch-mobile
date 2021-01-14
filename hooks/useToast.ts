import { useSelector } from '../store'

export const useToast = () =>
  useSelector((state) => state.toast)
