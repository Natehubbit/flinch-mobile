"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_native_1 = require("react-native");
var ImagePicker = require("expo-image-picker");
var firebase_1 = require("../config/firebase");
var constants_1 = require("../common/constants");
var UploadHookService_1 = require("./UploadHookService");
var moment_1 = require("moment");
var MediaLibrary = require("expo-media-library");
var VideoThumbnails = require("expo-video-thumbnails");
var FileSystem = require("expo-file-system");
var WebBrowser = require("expo-web-browser");
var theme_1 = require("../config/theme");
var IMG_OPTIONS = {
    allowsEditing: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images
};
var VID_OPTIONS = {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDuration: constants_1.RECORD_DURATION * 1000
};
var HelperService = /** @class */ (function () {
    function HelperService() {
    }
    HelperService.uploadPhoto = function (getImg) {
        return __awaiter(this, void 0, void 0, function () {
            var granted, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ImagePicker.requestCameraRollPermissionsAsync()];
                    case 1:
                        granted = (_a.sent()).granted;
                        if (!granted)
                            return [2 /*return*/, react_native_1.Alert.alert('Permission Failed', 'Allow permission to access images')];
                        return [4 /*yield*/, ImagePicker
                                .launchImageLibraryAsync(IMG_OPTIONS)];
                    case 2:
                        res = _a.sent();
                        if (res.cancelled === false) {
                            getImg(res.uri);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    HelperService.uploadVideo = function (getVideo) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, ImagePicker
                                .launchImageLibraryAsync(VID_OPTIONS)];
                    case 1:
                        res = _a.sent();
                        if (res.cancelled === false) {
                            getVideo(res.uri);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        alert(error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.parseToBlob = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var res, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch(uri)];
                    case 1:
                        res = _a.sent();
                        data = res.blob();
                        return [2 /*return*/, data];
                    case 2:
                        error_2 = _a.sent();
                        alert(error_2.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.generateBlobUrl = function (path, blob, loading, showHook) {
        return __awaiter(this, void 0, Promise, function () {
            var bucket, promise, error_3, isCancelled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bucket = firebase_1.storage.ref().child(path);
                        promise = bucket.put(blob);
                        showHook && UploadHookService_1["default"].setHook(promise);
                        loading && loading();
                        return [4 /*yield*/, promise];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, bucket.getDownloadURL()];
                    case 2:
                        error_3 = _a.sent();
                        isCancelled = error_3.code === 'storage/canceled';
                        !isCancelled && alert(error_3.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.generateThumbnail = function (videoUri, time) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, VideoThumbnails.getThumbnailAsync(videoUri, {
                                time: time * 1000
                            })];
                    case 1:
                        uri = (_a.sent()).uri;
                        return [2 /*return*/, uri];
                    case 2:
                        e_1 = _a.sent();
                        console.warn(e_1);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.saveMedia = function (album, uri) {
        return __awaiter(this, void 0, void 0, function () {
            var asset, albumExists, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, MediaLibrary.createAssetAsync(uri)];
                    case 1:
                        asset = _a.sent();
                        return [4 /*yield*/, MediaLibrary.getAlbumAsync(album)];
                    case 2:
                        albumExists = _a.sent();
                        if (!albumExists) return [3 /*break*/, 4];
                        return [4 /*yield*/, MediaLibrary.addAssetsToAlbumAsync([asset], albumExists)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, MediaLibrary.createAlbumAsync(album, asset, false)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/, false];
                    case 7:
                        e_2 = _a.sent();
                        console.log(e_2.message);
                        return [2 /*return*/, false];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.createDownload = function (id, uri, ext, callback) {
        var _this = this;
        try {
            var hook = FileSystem
                .createDownloadResumable(uri, "" + FileSystem.cacheDirectory + ext, {}, function (progress) { return _this.downloadCallback(progress, callback); });
            var download = {
                id: id,
                hook: hook,
                state: 'pending',
                progress: 0
            };
            return download;
        }
        catch (e) {
            console.log(e.message);
            return null;
        }
    };
    HelperService.startDownload = function (download) {
        return __awaiter(this, void 0, void 0, function () {
            var e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, download.hook.downloadAsync()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, download];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.downloadFile = function (id, url, ext, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var download, downloaded, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        download = this.createDownload(id, url, ext, callback);
                        _a = download;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.startDownload(download)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        downloaded = _a;
                        return [2 /*return*/, downloaded];
                }
            });
        });
    };
    HelperService.downloadCallback = function (progressInfo, callback) {
        var totalBytesExpectedToWrite = progressInfo.totalBytesExpectedToWrite, totalBytesWritten = progressInfo.totalBytesWritten;
        var progress = (totalBytesWritten / totalBytesExpectedToWrite) * 100;
        callback(Math.ceil(progress));
    };
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
    HelperService.shareMedia = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, react_native_1.Share.share({
                                message: msg
                            })];
                    case 1:
                        result = _a.sent();
                        if (result.action === react_native_1.Share.sharedAction) {
                            if (result.activityType) {
                                // shared with activity type of result.activityType
                            }
                            else {
                                // shared
                            }
                        }
                        else if (result.action === react_native_1.Share.dismissedAction) {
                            // dismissed
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        alert(error_4.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.getMediaInfo = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var asset, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, MediaLibrary.createAssetAsync(uri)];
                    case 1:
                        asset = _a.sent();
                        return [2 /*return*/, asset];
                    case 2:
                        e_4 = _a.sent();
                        console.log(e_4.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.deleteMediaInfo = function (assets) {
        return __awaiter(this, void 0, void 0, function () {
            var deleted, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, MediaLibrary.deleteAssetsAsync(assets)];
                    case 1:
                        deleted = _a.sent();
                        return [2 /*return*/, deleted];
                    case 2:
                        e_5 = _a.sent();
                        console.log(e_5.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.parseToMoney = function (val) {
        try {
            return "GHs" + (val / 100).toFixed(2);
        }
        catch (e) {
            console.log(e.message);
            return '';
        }
    };
    HelperService.openBrowser = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, WebBrowser.openBrowserAsync(uri, {
                                showTitle: true,
                                toolbarColor: theme_1.theme.colors.primary
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.closeBrowser = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    WebBrowser.dismissBrowser();
                    return [2 /*return*/, true];
                }
                catch (e) {
                    console.log(e.message);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    HelperService.parseToDate = function (val) {
        var diffDays = moment_1["default"]().diff(val, 'day');
        var date = diffDays < 3
            ? moment_1["default"](val).fromNow()
            : moment_1["default"](val).format('DD MMM YY');
        return date;
    };
    HelperService.exitApp = function () {
        react_native_1.Alert.alert('Exit?', 'Are you sure you want to exit Flinch?', [
            {
                text: 'Yes',
                onPress: function () { return react_native_1.BackHandler.exitApp(); }
            },
            {
                text: 'No',
                style: 'cancel'
            }
        ]);
        return true;
    };
    return HelperService;
}());
exports["default"] = HelperService;
