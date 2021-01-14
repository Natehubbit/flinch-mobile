import { useSelector } from '../store'

export const useDownloads = () =>
  useSelector((state) => state.downloads)
