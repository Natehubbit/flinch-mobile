import RequestService from '../services/RequestService'
import { useSelector } from '../store'
import { RequestKeys } from '../types'

export const useRequests =
  (key?:RequestKeys, val?:any) =>
    useSelector(async ({ requests }) => {
      if (key && val) {
        const data = requests.filter(d => d[key] === val)
        if (data.length < 1) {
          if (key === 'id') {
            const request = await RequestService
              .getRequest(val)
            return [request] || []
          }
        }
        return data
      }
      return requests
    })
