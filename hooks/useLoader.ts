import { useSelector } from '../store'

export const useLoader = () => useSelector(state => state.loader)
