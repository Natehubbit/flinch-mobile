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
var expo_1 = require("expo");
var ImagePicker = require("expo-image-picker");
var firebase_1 = require("../config/firebase");
var constants_1 = require("../common/constants");
var UploadHookService_1 = require("./UploadHookService");
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
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.generateBlobUrl = function (path, blob, loading) {
        return __awaiter(this, void 0, Promise, function () {
            var bucket, promise, error_3, isCancelled;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        bucket = firebase_1.storage.ref().child(path);
                        promise = bucket.put(blob);
                        UploadHookService_1["default"].setHook(promise);
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
    HelperService.openBrowser = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var supported, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, expo_1.Linking.canOpenURL(url)];
                    case 1:
                        supported = _a.sent();
                        if (!supported) return [3 /*break*/, 3];
                        return [4 /*yield*/, expo_1.Linking.openURL(url)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        alert("Don't know how to open this URL: " + url);
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_4 = _a.sent();
                        alert(error_4.message);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    HelperService.parseToMoney = function (val) {
        return "GHs" + (val / 100).toFixed(2);
    };
    return HelperService;
}());
exports["default"] = HelperService;
