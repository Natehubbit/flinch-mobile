import firebase from 'firebase'
export default class UploadHookService {
  static uploadHookRef: firebase.storage.UploadTask = null

  static setHook(
    hook: firebase.storage.UploadTask
  ) {
    this.uploadHookRef = hook
  }

  static listen(
    setProgress: (val: number) => void,
    onError?: () => void,
    onComplete?: () => void
  ) {
    const reset = () => {
      setProgress(0)
      // this.setHook(null)
    }
    return this.uploadHookRef.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      (snap) => this.next(snap, setProgress),
      (e) => this.error(e, onError, reset),
      () => this.complete(onComplete)
    )
  }

  static pause() {
    return this.uploadHookRef.pause()
  }

  static cancel(callback?: () => void) {
    this.uploadHookRef.cancel()
    // callback && callback()
  }

  static next(
    snapshot: firebase.storage.UploadTaskSnapshot,
    setProgress: (val: number) => void
  ) {
    const progress =
      snapshot.bytesTransferred /
      snapshot.totalBytes
    setProgress(progress)
  }

  static error(
    error: Error,
    reset: () => void,
    onError?: () => void
  ) {
    const cancelled =
      (error as any).code === 'storage/canceled'
    console.log(cancelled)
    if (!cancelled) {
      onError && onError()
      console.log(error.message)
    }
    reset()
  }

  static complete(onComplete?: () => void) {
    onComplete && onComplete()
  }
}
