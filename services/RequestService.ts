import { db } from '../config/firebase'
import { Request, RequestResponse, RequestStatus } from '../types'
import { initStateRequest, REQUEST_VIDEO_PATH } from '../common/constants'
import HelperService from './HelperService'

const RequestRef = db.collection('requests')

interface ApproveResponse {
    status:RequestStatus;
    response:RequestResponse
}

export default class RequestService {
  static async createRequest (data:Request) {
    try {
      const { id } = await RequestRef.add(data)
      return { ...data, id }
    } catch (e) {
      alert(e.message)
      return null
    }
  }

  static async getRequest (id:string) {

  }

  static async approveRequest (
    id:string,
    appUri:string,
    duration:number,
    loading?:()=>void
  ):Promise<ApproveResponse|null> {
    try {
      const video = await HelperService.parseToBlob(appUri)
      const uri = await HelperService
        .generateBlobUrl(
                    `${REQUEST_VIDEO_PATH}${id}`,
                    video,
                    loading
        )
      console.log(uri)
      if (uri) {
        await RequestRef.doc(id)
          .update({
            'response.videoUri': uri,
            'response.status': 'approved',
            'response.duration': duration,
            status: 'success'
          })
        return {
          status: 'success',
          response: {
            duration,
            status: 'approved',
            videoUri: uri,
            timestamp: Date.now()
          }
        }
      }
      return null
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async rejectRequest (id:string) {
    try {
      await RequestRef
        .doc(id)
        .update({
          'response.status': 'rejected',
          status: 'failed'
        })
      return true
    } catch (e) {
      alert(e.message)
      return false
    }
  }

  /**
     * Get all user requests
     * @param id requestor id
     */
  static async getAllRequests (id:string): Promise<Request[]> {
    try {
      const res = await RequestRef
        .where('requestor.id', '==', id)
        .get()
      return res.docs.map(d => ({
        ...initStateRequest,
        ...d.data(),
        id: d.id
      }))
    } catch (e) {
      alert(e.message)
      return null
    }
  }
}
