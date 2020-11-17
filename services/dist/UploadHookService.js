'use strict'
exports.__esModule = true
const firebase_1 = require('firebase')
const UploadHookService = /** @class */ (function () {
  function UploadHookService () {
  }
  UploadHookService.setHook = function (hook) {
    this.uploadHookRef = hook
  }
  UploadHookService.listen = function (setProgress) {
    const _this = this
    const reset = function () {
      setProgress(0)
      _this.setHook(null)
    }
    return this.uploadHookRef.on(firebase_1.default.storage.TaskEvent.STATE_CHANGED, function (snap) { return _this.next(snap, setProgress) }, function (e) { return _this.error(e, reset) }, this.complete)
  }
  UploadHookService.pause = function () {
    return this.uploadHookRef.pause()
  }
  UploadHookService.cancel = function () {
    return this.uploadHookRef.cancel()
  }
  UploadHookService.next = function (snapshot, setProgress) {
    const progress = snapshot.bytesTransferred / snapshot.totalBytes
    setProgress(progress)
  }
  UploadHookService.error = function (error, reset) {
    reset()
    console.log(error.message)
  }
  UploadHookService.complete = function () {
    console.log('completed')
  }
  UploadHookService.uploadHookRef = null
  return UploadHookService
}())
exports.default = UploadHookService
