import { useSelector } from '../store'

export const useDownload = (id:string) => useSelector(state => {
  const { downloads } = state
  return id
    ? downloads.find(d => d.id === id)
    : {
        hook: null,
        id: '',
        progress: 0,
        state: ''
      }
})
