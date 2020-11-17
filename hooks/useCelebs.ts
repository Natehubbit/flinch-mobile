import { useSelector } from '../store'

export const useCelebs = () => useSelector(state => state.celebs)
