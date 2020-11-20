import { Alert } from 'react-native'
import { Linking } from 'expo'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../config/firebase'
import { RECORD_DURATION } from '../common/constants'
import UploadHookService from './UploadHookService'

const IMG_OPTIONS:ImagePicker.ImagePickerOptions = {
  allowsEditing: true,
  mediaTypes: ImagePicker.MediaTypeOptions.Images
}

const VID_OPTIONS:ImagePicker.ImagePickerOptions = {
  mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  videoMaxDuration: RECORD_DURATION * 1000
}

export default class HelperService {
  static async uploadPhoto (getImg:(uri:string)=>void) {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync()
    if (!granted) return Alert.alert('Permission Failed', 'Allow permission to access images')
    const res = await ImagePicker
      .launchImageLibraryAsync(IMG_OPTIONS)
    if (res.cancelled === false) {
      getImg(res.uri)
    }
  }

  static async uploadVideo (getVideo:(uri:string)=>void) {
    try {
      const res = await ImagePicker
        .launchImageLibraryAsync(VID_OPTIONS)
      if (res.cancelled === false) {
        console.log(res.exif)
        getVideo(res.uri)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  static async parseToBlob (uri:string) {
    try {
      const res = await fetch(uri)
      const data = res.blob()
      return data
    } catch (error) {
      alert(error.message)
    }
  }

  static async generateBlobUrl (
    path:string,
    blob:Blob,
    loading?:()=>void
  ):Promise<null|string> {
    try {
      const bucket = storage.ref().child(path)
      const promise = bucket.put(blob)
      UploadHookService.setHook(promise)
      loading && loading()
      await promise
      return bucket.getDownloadURL()
    } catch (error) {
      const isCancelled = error.code === 'storage/canceled'
      !isCancelled && alert(error.message)
      return null
    }
  }

  static async openBrowser (url:string) {
    try {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        alert(`Don't know how to open this URL: ${url}`)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  static parseToMoney (val:number) {
    try {
      return `GHs${(val / 100).toFixed(2)}`
    } catch (e) {
      console.log(e.message)
      return ''
    }
  }
}
