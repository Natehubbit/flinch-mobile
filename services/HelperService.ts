import { Alert, BackHandler, Share, Vibration } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { storage } from '../config/firebase'
import { RECORD_DURATION } from '../common/constants'
import UploadHookService from './UploadHookService'
import moment from 'moment'
import * as MediaLibrary from 'expo-media-library'
import * as VideoThumbnails from 'expo-video-thumbnails'
import * as FileSystem from 'expo-file-system'
import { Download, Price } from '../types'
import * as WebBrowser from 'expo-web-browser'
import { theme } from '../config/theme'

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
    const { granted } = await ImagePicker
      .requestCameraRollPermissionsAsync()
    if (!granted) return Alert.alert('Permission Failed', 'Allow permission to access images')
    const res = await ImagePicker
      .launchImageLibraryAsync(IMG_OPTIONS)
    if (res.cancelled === false) {
      getImg(res.uri)
    }
  }

  static async uploadVideo (getVideo:(uri:string)=>void) {
    try {
      const { granted } = await ImagePicker
        .requestCameraRollPermissionsAsync()
      if (granted) {
        const res = await ImagePicker
          .launchImageLibraryAsync(VID_OPTIONS)
        if (res.cancelled === false) {
          getVideo(res.uri)
        }
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
      return null
    }
  }

  static async generateBlobUrl (
    path:string,
    blob:Blob,
    showHook?:boolean,
    loading?:()=>void
  ):Promise<null|string> {
    try {
      const bucket = storage.ref().child(path)
      const promise = bucket.put(blob)
      showHook && UploadHookService
        .setHook(promise)
      loading && loading()
      await promise
      return bucket.getDownloadURL()
    } catch (error) {
      const isCancelled = error.code === 'storage/canceled'
      !isCancelled && alert(error.message)
      return null
    }
  }

  static async generateThumbnail (videoUri:string, time:number) {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoUri,
        {
          time: time * 1000
        }
      )
      return uri
    } catch (e) {
      console.warn(e)
      return null
    }
  }

  static async saveMedia (album:string, uri:string) {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri)
      const albumExists = await MediaLibrary.getAlbumAsync(album)
      if (albumExists) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], albumExists)
      } else {
        await MediaLibrary.createAlbumAsync(album, asset, false)
      }
      return false
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static createDownload (
    id:string,
    uri:string,
    ext:string,
    callback:(val:number)=>void
  ) {
    try {
      const hook = FileSystem
        .createDownloadResumable(
          uri,
          `${FileSystem.cacheDirectory}${ext}`,
          {},
          progress => this.downloadCallback(progress, callback)
        )
      const download: Download = {
        id,
        hook,
        state: 'pending',
        progress: 0
      }
      return download
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async startDownload (download:Download) {
    try {
      await download.hook.downloadAsync()
      return download
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async downloadFile (
    id:string,
    url:string,
    ext:string,
    callback:(val:number)=>void
  ) {
    const download = this.createDownload(id, url, ext, callback)
    const downloaded = download && await this.startDownload(download)
    return downloaded
  }

  static downloadCallback (
    progressInfo:FileSystem.DownloadProgressData,
    callback:(val:number)=>void
  ) {
    const {
      totalBytesExpectedToWrite,
      totalBytesWritten
    } = progressInfo
    const progress =
      (totalBytesWritten / totalBytesExpectedToWrite) * 100
    callback(Math.ceil(progress))
  }

  // static async openBrowser (url:string) {
  //   try {
  //     const supported = await Linking.canOpenURL(url)
  //     if (supported) {
  //       await Linking.openURL(url)
  //     } else {
  //       alert(`Don't know how to open this URL: ${url}`)
  //     }
  //   } catch (error) {
  //     alert(error.message)
  //   }
  // }

  static async shareMedia (msg?:string) {
    try {
      const result = await Share.share({
        message: msg
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message)
    }
  }

  static async getMediaInfo (uri:string) {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri)
      return asset
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async deleteMediaInfo (assets:MediaLibrary.Asset[]|string[]) {
    try {
      const deleted = await MediaLibrary.deleteAssetsAsync(assets)
      return deleted
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static parseToMoney ({
    amount,
    currency
  }: Price
  ):string|null {
    try {
      // TODO: ABS VAL OF AMOUNT/100 FOR PAYSTACK
      return `${currency}${(amount)}`
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async openBrowser (uri:string) {
    try {
      await WebBrowser.openBrowserAsync(uri, {
        showTitle: true,
        toolbarColor: theme.colors.primary
      })
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static async closeBrowser () {
    try {
      WebBrowser.dismissBrowser()
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static vibrate () {
    const INTERVAL = 250
    const PATTERN = [0, INTERVAL, INTERVAL, INTERVAL]
    Vibration.vibrate(PATTERN)
  }

  static parseToDate (val:number) {
    const diffDays = moment().diff(val, 'day')
    const date = diffDays < 3
      ? moment(val).fromNow()
      : moment(val).format('DD MMM YY')
    return date
  }

  static exitApp () {
    Alert.alert(
      'Exit?',
      'Are you sure you want to exit Flinch?',
      [
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp()
        },
        {
          text: 'No',
          style: 'cancel'
        }
      ]
    )
    return true
  }
}
