import { db } from '../config/firebase'
import { Loader, LoaderString, Request, RequestResponse, RequestStatus } from '../types'
import { initStateRequest, REQUEST_VIDEO_PATH, THUMBS_PATH } from '../common/constants'
import HelperService from './HelperService'
import * as VideoThumbnails from 'expo-video-thumbnails'

const RequestRef = db.collection('requests')

interface ApproveResponse {
  status:RequestStatus;
  response:RequestResponse
}

export default class RequestService {
  static async createRequest (data:Request): Promise<Request> {
    try {
      const { id } = await RequestRef.add(data)
      return { ...data, id }
    } catch (e) {
      alert(e.message)
      return null
    }
  }

  static async getRequest (id:string) {
    try {
      const res = await RequestRef
        .doc(id)
        .get()
      return {
        id: res.id,
        ...res.data()
      } as Request
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async getCelebRequests (
    id:string
  ):Promise<Request[]|null> {
    try {
      const res = await RequestRef
        .where('celebrity.id', '==', id)
        .where('payment.payed', '==', true)
        .orderBy('response.timestamp', 'desc')
        .get()
      return res
        .docs
        .map(d => ({
          id: d.id,
          ...d.data()
        })) as Request[]
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async approveRequest (
    id:string,
    appUri:string,
    loading?:(data:{key:LoaderString, data:Loader})=>void
  ):Promise<ApproveResponse|null> {
    try {
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Fetching Video Details',
          showBtns: false
        }
      })
      // get duration for cached video
      const asset = await HelperService.getMediaInfo(appUri)
      const { duration } = asset ||
        { id: '', duration: 0 }
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Parsing video...'
        }
      })
      // parse video to blob to upload to firebase storage
      const video = await HelperService.parseToBlob(appUri)
      // upload video blob to firebase storage
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Uploading video to server...',
          showBtns: true,
          type: 'progress'
        }
      })

      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: false
        }
      })

      const reload = () => {
        loading && loading({
          key: 'responseLoader',
          data: {
            isLoading: true
          }
        })
      }

      const uri = await HelperService
        .generateBlobUrl(
          `${REQUEST_VIDEO_PATH}${id}`,
          video,
          true,
          reload
        )
      console.log('URI:: ', uri)
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Generating thumbnail...',
          showBtns: false,
          type: 'loader'
        }
      })
      // generate thumbnail for local uri midway through video
      const { uri: thumbUri } = await VideoThumbnails
        .getThumbnailAsync(uri, {
          time: Math.abs(duration) / 2
        })
      // parse thumbnail to blob to upload to storage
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Uploading video thumbnail',
          showBtns: false,
          type: 'loader'
        }
      })
      const thumb = await HelperService.parseToBlob(thumbUri)
      // upload thumb to storage
      const thumbUrl = await HelperService
        .generateBlobUrl(
          `${THUMBS_PATH}${id}`,
          thumb
        )
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: true,
          label: 'Approving request...',
          showBtns: false
        }
      })
      if (uri) {
        await RequestRef.doc(id)
          .update({
            'response.videoUri': uri,
            'response.status': 'approved',
            'response.duration': duration,
            status: 'success',
            'response.thumbnailUri': thumbUrl,
            'response.timestamp': Date.now()
          })
        asset && await HelperService.deleteMediaInfo([asset])
        loading && loading({
          key: 'responseLoader',
          data: {
            isLoading: true,
            label: 'Request approved.',
            showBtns: false
          }
        })
        loading && loading({
          key: 'responseLoader',
          data: {
            isLoading: false
          }
        })
        return {
          status: 'success',
          response: {
            duration,
            status: 'approved',
            videoUri: uri,
            thumbnailUri: thumbUrl,
            timestamp: Date.now()
          }
        }
      }
      asset && await HelperService.deleteMediaInfo([asset])
      return null
    } catch (e) {
      loading && loading({
        key: 'responseLoader',
        data: {
          isLoading: false
        }
      })
      alert(e.message)
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
  static async getAllRequests (id:string): Promise<Request[]|null> {
    try {
      const res = await RequestRef
        .where('requestor.id', '==', id)
        .where('payment.payed', '==', true)
        .orderBy('timestamp', 'desc')
        .get()
      return res.docs.map(d => ({
        ...initStateRequest,
        ...d.data(),
        id: d.id
      }))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async pendingListener (
    id:string,
    isUser:boolean,
    callback?:(val:Request[])=>void,
    loading?:()=>void,
    loaded?:()=>void
  ) {
    try {
      loading && loading()
      const userRefId = isUser
        ? 'requestor.id'
        : 'celebrity.id'
      return RequestRef
        .where(userRefId, '==', id)
        .where('status', '==', 'pending')
        .where('payment.payed', '==', true)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snap => {
          callback && callback(snap
            .docs
            .map(s => ({
              id: s.id,
              ...s.data()
            }) as Request)
          )
          loaded && loaded()
        })
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static getCelebResponseCount = (
    id:string,
    callback:(val:number)=>void
  ) => {
    try {
      return RequestRef
        .where('status', '==', 'success')
        .where('celebrity.id', '==', id)
        .where('response.status', '==', 'approved')
        .onSnapshot(snap => {
          callback &&
          callback(snap.size)
        })
    } catch (e) {
      alert(e.message)
      return null
    }
  }
}
