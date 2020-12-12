import { useSelector } from '../store'

export const useSelect = () => useSelector(state => state.selector)
