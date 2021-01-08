import { useSelector } from '../store'
import { RequestKeys } from '../types'

export const useRequests =
  (key?:RequestKeys, val?:any) =>
    useSelector(({ requests }) => {
      if (key && val) {
        return requests.filter(d => d[key] === val)
      }
      return requests
    }
    )
