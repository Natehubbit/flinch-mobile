"use strict";
exports.__esModule = true;
var firebase_1 = require("firebase");
var UploadHookService = /** @class */ (function () {
    function UploadHookService() {
    }
    UploadHookService.setHook = function (hook) {
        this.uploadHookRef = hook;
    };
    UploadHookService.listen = function (setProgress, onError, onComplete) {
        var _this = this;
        var reset = function () {
            setProgress(0);
            _this.setHook(null);
        };
        return this.uploadHookRef.on(firebase_1["default"].storage.TaskEvent.STATE_CHANGED, function (snap) { return _this.next(snap, setProgress); }, function (e) { return _this.error(e, onError, reset); }, function () { return _this.complete(onComplete); });
    };
    UploadHookService.pause = function () {
        return this.uploadHookRef.pause();
    };
    UploadHookService.cancel = function () {
        return this.uploadHookRef.cancel();
    };
    UploadHookService.next = function (snapshot, setProgress) {
        var progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(progress);
    };
    UploadHookService.error = function (error, reset, onError) {
        reset();
        onError && onError();
        console.log(error.message);
    };
    UploadHookService.complete = function (onComplete) {
        onComplete && onComplete();
    };
    UploadHookService.uploadHookRef = null;
    return UploadHookService;
}());
exports["default"] = UploadHookService;
