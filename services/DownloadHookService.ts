import * as FileSystem from 'expo-file-system'
import HelperService from './HelperService'

export default class DownloadHookService {
  static downloadHookRef: FileSystem.DownloadResumable | null = null

  static setHookRef(
    uri: string,
    ext: string,
    callback: (progress: number) => void
  ) {
    this.downloadHookRef = FileSystem.createDownloadResumable(
      uri,
      `${FileSystem.cacheDirectory}${ext}`,
      {},
      (progress) =>
        HelperService.downloadCallback(
          progress,
          callback
        )
    )
  }

  static async download(
    url: string,
    ext: string,
    callback: (progress: number) => void
  ) {
    try {
      this.setHookRef(url, ext, callback)
      const res = await this.downloadHookRef.downloadAsync()
      return res.uri
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}
