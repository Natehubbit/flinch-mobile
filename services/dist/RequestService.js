"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var firebase_1 = require("../config/firebase");
var constants_1 = require("../common/constants");
var HelperService_1 = require("./HelperService");
var VideoThumbnails = require("expo-video-thumbnails");
var react_native_1 = require("react-native");
var RequestRef = firebase_1.db.collection('requests');
var RequestService = /** @class */ (function () {
    function RequestService() {
    }
    RequestService.createRequest = function (data) {
        return __awaiter(this, void 0, Promise, function () {
            var id, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RequestRef.add(data)];
                    case 1:
                        id = (_a.sent()).id;
                        return [2 /*return*/, __assign(__assign({}, data), { id: id })];
                    case 2:
                        e_1 = _a.sent();
                        alert(e_1.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.getRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RequestRef.doc(id).get()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, __assign({ id: res.id }, res.data())];
                    case 2:
                        e_2 = _a.sent();
                        console.log(e_2.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.getCelebRequests = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RequestRef.where('celebrity.id', '==', id)
                                .where('payment.payed', '==', true)
                                .orderBy('response.timestamp', 'desc')
                                .get()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.docs.map(function (d) { return (__assign({ id: d.id }, d.data())); })];
                    case 2:
                        e_3 = _a.sent();
                        console.log(e_3.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.approveRequest = function (id, localUri, loading) {
        return __awaiter(this, void 0, Promise, function () {
            var asset, _a, duration, video, _b, reloadHook, uri, _c, thumbUri, _d, thumb, _e, thumbUrl, _f, _g, e_4;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _h.trys.push([0, 17, , 18]);
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: true,
                                    label: 'Fetching Video Details',
                                    showBtns: false
                                }
                            });
                        _a = localUri;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, HelperService_1["default"].getMediaInfo(localUri)];
                    case 1:
                        _a = (_h.sent());
                        _h.label = 2;
                    case 2:
                        asset = _a;
                        duration = (asset || {
                            id: '',
                            duration: 0
                        }).duration;
                        !!asset &&
                            loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    label: 'Parsing video...'
                                }
                            });
                        _b = !!localUri;
                        if (!_b) return [3 /*break*/, 4];
                        return [4 /*yield*/, HelperService_1["default"].parseToBlob(localUri)
                            // upload video blob to firebase storage
                        ];
                    case 3:
                        _b = (_h.sent());
                        _h.label = 4;
                    case 4:
                        video = _b;
                        // upload video blob to firebase storage
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    label: 'Uploading video to server...',
                                    showBtns: true,
                                    type: 'progress'
                                }
                            });
                        reloadHook = function () {
                            loading &&
                                loading({
                                    key: 'responseLoader',
                                    data: {
                                        isLoading: true
                                    }
                                });
                        };
                        _c = !!video;
                        if (!_c) return [3 /*break*/, 6];
                        return [4 /*yield*/, HelperService_1["default"].generateBlobUrl("" + constants_1.REQUEST_VIDEO_PATH + id, video, true, reloadHook)];
                    case 5:
                        _c = (_h.sent());
                        _h.label = 6;
                    case 6:
                        uri = _c;
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    label: 'Generating video thumbnail...',
                                    showBtns: false,
                                    type: 'loader'
                                }
                            });
                        _d = !!uri;
                        if (!_d) return [3 /*break*/, 8];
                        return [4 /*yield*/, VideoThumbnails.getThumbnailAsync(uri, {
                                time: Math.abs(duration) / 2
                            })];
                    case 7:
                        _d = (_h.sent());
                        _h.label = 8;
                    case 8:
                        thumbUri = ((_d) || { uri: '' }).uri;
                        // parse thumbnail to blob to upload to storage
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: true,
                                    label: 'Uploading video thumbnail...',
                                    showBtns: false,
                                    type: 'loader'
                                }
                            });
                        _e = !!thumbUri;
                        if (!_e) return [3 /*break*/, 10];
                        return [4 /*yield*/, HelperService_1["default"].parseToBlob(thumbUri)
                            // upload thumb to storage
                        ];
                    case 9:
                        _e = (_h.sent());
                        _h.label = 10;
                    case 10:
                        thumb = _e;
                        _f = !!thumb &&
                            !!id;
                        if (!_f) return [3 /*break*/, 12];
                        return [4 /*yield*/, HelperService_1["default"].generateBlobUrl("" + constants_1.THUMBS_PATH + id, thumb)];
                    case 11:
                        _f = (_h.sent());
                        _h.label = 12;
                    case 12:
                        thumbUrl = _f;
                        thumbUrl &&
                            loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: true,
                                    label: 'Approving request...',
                                    showBtns: false
                                }
                            });
                        if (!(uri && thumbUrl)) return [3 /*break*/, 16];
                        return [4 /*yield*/, RequestRef.doc(id).update({
                                'response.videoUri': uri,
                                'response.status': 'approved',
                                'response.duration': duration,
                                status: 'success',
                                'response.thumbnailUri': thumbUrl,
                                'response.timestamp': Date.now()
                            })];
                    case 13:
                        _h.sent();
                        _g = asset;
                        if (!_g) return [3 /*break*/, 15];
                        return [4 /*yield*/, HelperService_1["default"].deleteMediaInfo([
                                asset
                            ])];
                    case 14:
                        _g = (_h.sent());
                        _h.label = 15;
                    case 15:
                        _g;
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: false
                                }
                            });
                        return [2 /*return*/, {
                                status: 'success',
                                response: {
                                    duration: duration,
                                    status: 'approved',
                                    videoUri: uri,
                                    thumbnailUri: thumbUrl,
                                    timestamp: Date.now()
                                }
                            }];
                    case 16:
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: false
                                }
                            });
                        // const noError = !!video && !!uri && !!thumbUri && !!thumb
                        asset &&
                            (HelperService_1["default"].deleteMediaInfo([
                                asset
                            ]));
                        return [2 /*return*/, null];
                    case 17:
                        e_4 = _h.sent();
                        loading &&
                            loading({
                                key: 'responseLoader',
                                data: {
                                    isLoading: false
                                }
                            });
                        react_native_1.Alert.alert('Error', e_4.message);
                        return [2 /*return*/, null];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.rejectRequest = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RequestRef.doc(id).update({
                                'response.status': 'rejected',
                                status: 'failed'
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        e_5 = _a.sent();
                        react_native_1.Alert.alert('Error', e_5.message);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get all user requests
     * @param id requestor id
     */
    RequestService.getAllRequests = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, RequestRef.where('requestor.id', '==', id)
                                .where('payment.payed', '==', true)
                                .orderBy('timestamp', 'desc')
                                .get()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.docs.map(function (d) { return (__assign(__assign(__assign({}, constants_1.initStateRequest), d.data()), { id: d.id })); })];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6.message);
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RequestService.pendingListener = function (id, isUser, callback, loading, loaded) {
        return __awaiter(this, void 0, void 0, function () {
            var userRefId;
            return __generator(this, function (_a) {
                try {
                    loading && loading();
                    userRefId = isUser
                        ? 'requestor.id'
                        : 'celebrity.id';
                    return [2 /*return*/, RequestRef.where(userRefId, '==', id)
                            .where('status', '==', 'pending')
                            .where('payment.payed', '==', true)
                            .orderBy('timestamp', 'desc')
                            .onSnapshot(function (snap) {
                            callback &&
                                callback(snap.docs.map(function (s) {
                                    return (__assign({ id: s.id }, s.data()));
                                }));
                            loaded && loaded();
                        })];
                }
                catch (e) {
                    console.log(e.message);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    RequestService.getCelebResponseCount = function (id, callback) {
        try {
            return RequestRef.where('status', '==', 'success')
                .where('celebrity.id', '==', id)
                .where('response.status', '==', 'approved')
                .onSnapshot(function (snap) {
                callback && callback(snap.size);
            });
        }
        catch (e) {
            alert(e.message);
            return null;
        }
    };
    return RequestService;
}());
exports["default"] = RequestService;
