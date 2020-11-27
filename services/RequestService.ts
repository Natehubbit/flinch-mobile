import { db } from '../config/firebase'
import { Request, RequestResponse, RequestStatus } from '../types'
import { initStateRequest, REQUEST_VIDEO_PATH, THUMBS_PATH } from '../common/constants'
import HelperService from './HelperService'
import * as VideoThumbnails from 'expo-video-thumbnails'

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
    loading?:()=>void
  ):Promise<ApproveResponse|null> {
    try {
      // get duration for cached video
      const { id: assetId, duration } = await HelperService.getMediaInfo(appUri)
      // parse video to blob to upload to firebase storage
      const video = await HelperService.parseToBlob(appUri)
      // upload video blob to firebase storage
      const uri = await HelperService
        .generateBlobUrl(
          `${REQUEST_VIDEO_PATH}${id}`,
          video,
          loading
        )
      // generate thumbnail for local uri midway through video
      const { uri: thumbUri } = await VideoThumbnails
        .getThumbnailAsync(uri, {
          time: duration / 2
        })
      // parse thumbnail to blob to upload to storage
      const thumb = await HelperService.parseToBlob(thumbUri)
      // upload thumb to storage
      const thumbUrl = await HelperService
        .generateBlobUrl(
          `${THUMBS_PATH}${id}`,
          thumb
        )
      if (uri) {
        await RequestRef.doc(id)
          .update({
            'response.videoUri': uri,
            'response.status': 'approved',
            'response.duration': duration,
            status: 'success',
            'response.thumbnailUri': thumbUrl
          })
        return {
          status: 'success',
          response: {
            duration,
            status: 'approved',
            videoUri: uri,
            thmbnailUri: thumbUrl,
            timestamp: Date.now()
          }
        }
      }
      HelperService.deleteMediaInfo([assetId])
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
