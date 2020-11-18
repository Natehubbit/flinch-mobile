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
var native_1 = require("@react-navigation/native");
var react_native_background_timer_1 = require("react-native-background-timer");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var vector_icons_1 = require("@expo/vector-icons");
var expo_av_1 = require("expo-av");
var expo_camera_1 = require("expo-camera");
var react_redux_1 = require("react-redux");
var requests_1 = require("../../store/requests");
var useToast_1 = require("../../hooks/useToast");
var toast_1 = require("../../store/toast");
var RECORD_OPTIONS = {
    mute: false,
    maxDuration: 60,
    quality: expo_camera_1.Camera.Constants.VideoQuality['480p']
};
var time = 0;
var timerId = null;
var VideoRecord = function () {
    var camera = react_1.useRef(null);
    var dispatch = react_redux_1.useDispatch();
    var toast = useToast_1.useToast();
    var id = native_1.useRoute().params.id;
    var _a = react_1.useState(false), isRecording = _a[0], setIsRecording = _a[1];
    var _b = react_1.useState('16:9'), ratio = _b[0], setRatio = _b[1];
    var _c = react_1.useState(false), isPreviewing = _c[0], setIsPreviewing = _c[1];
    var _d = react_1.useState(''), videoUri = _d[0], setVideoUri = _d[1];
    var _e = react_1.useState(0), timer = _e[0], setTimer = _e[1];
    var _f = react_1.useState(false), showControls = _f[0], setShowControls = _f[1];
    var goBack = native_1.useNavigation().goBack;
    react_1.useEffect(function () {
        var cleanUp = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (isRecording) {
                    resetTimer();
                    react_native_background_timer_1["default"].stopBackgroundTimer();
                    camera.current.stopRecording();
                }
                return [2 /*return*/];
            });
        }); };
        var setCameraRatio = function () { return __awaiter(void 0, void 0, void 0, function () {
            var ratioData, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, camera.current.getSupportedRatiosAsync()];
                    case 1:
                        ratioData = _a.sent();
                        res = ratioData.pop();
                        setRatio(res);
                        return [2 /*return*/];
                }
            });
        }); };
        setCameraRatio();
        return function () {
            cleanUp();
        };
    }, []);
    var onGoBack = function () { return goBack(); };
    var onStopVideo = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!camera.current)
                return [2 /*return*/];
            setIsRecording(false);
            camera.current.stopRecording();
            return [2 /*return*/];
        });
    }); };
    var onRecordVideo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var promise, data, uri, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(camera.current && !isRecording)) return [3 /*break*/, 4];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    resetTimer();
                    setIsRecording(true);
                    promise = camera.current.recordAsync(RECORD_OPTIONS);
                    startTimer();
                    return [4 /*yield*/, promise];
                case 2:
                    data = _a.sent();
                    if (data) {
                        uri = data.uri;
                        setIsRecording(false);
                        setVideoUri(uri);
                    }
                    resetTimer();
                    setIsPreviewing(true);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    setIsRecording(false);
                    resetTimer();
                    alert(e_1.message);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var onPreviewClose = function () {
        if (showControls)
            return setShowControls(false);
        setIsPreviewing(false);
    };
    var onRecordAgain = function () {
        setIsPreviewing(false);
    };
    // const onSubmitted = () => {
    //   reset({
    //     index: 0,
    //     routes: [{ name: 'Requests', key: null }]
    //   })
    // }
    var onSend = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            dispatch(toast_1.toastActions.setToast(__assign(__assign({}, toast), { show: false, onPress: send })));
            send();
            return [2 /*return*/];
        });
    }); };
    var send = function () {
        dispatch(requests_1.requestsActions
            .approveRequest(id, videoUri, timer
        // onSubmitted
        ));
    };
    var startTimer = function () {
        timerId = setInterval(function () {
            time = time + 1;
            setTimer(time);
        }, 1000);
    };
    var resetTimer = function () {
        time = 0;
        setTimer(0);
        timerId && clearInterval(timerId);
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.View, { style: styles.nav },
            (isRecording || isPreviewing)
                ? null
                : react_1["default"].createElement(react_native_paper_1.FAB, { icon: "arrow-left", style: styles.icon, small: true, onPress: onGoBack }),
            isRecording && react_1["default"].createElement(react_native_1.View, { style: styles.recording },
                react_1["default"].createElement(react_native_1.View, { style: styles.recordingText },
                    react_1["default"].createElement(styledComponents_1.Paragraph, null, "Recording"),
                    react_1["default"].createElement(react_native_1.View, { style: styles.recordIndicator })))),
        !isPreviewing &&
            react_1["default"].createElement(expo_camera_1.Camera, { style: styles.camera, type: expo_camera_1.Camera.Constants.Type.front, ref: camera, ratio: ratio }),
        (isPreviewing) &&
            react_1["default"].createElement(react_native_1.View, { style: styles.videoContainer },
                react_1["default"].createElement(react_native_1.View, null,
                    react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'close', style: styles.close, onPress: onPreviewClose, small: true })),
                react_1["default"].createElement(expo_av_1.Video, { source: { uri: videoUri }, style: styles.video, isLooping: true, shouldPlay: true, resizeMode: 'cover' }),
                react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'send', style: styles.send, onPress: onSend }),
                !showControls &&
                    react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'refresh', style: styles.save, label: 'Record again', small: true, onPress: onRecordAgain })),
        react_1["default"].createElement(react_native_1.View, { style: styles.content },
            !isRecording && !isPreviewing &&
                react_1["default"].createElement(react_native_1.View, { style: styles.recordButton },
                    react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: { flex: 1 }, onPress: onRecordVideo },
                        react_1["default"].createElement(react_native_1.View, null))),
            isRecording && react_1["default"].createElement(react_native_1.View, { style: styles.recordBtns },
                react_1["default"].createElement(react_native_1.View, { style: styles.miniBtn },
                    react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: styles.miniBtn, onPress: null },
                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { size: 35, color: '#fff', name: 'pause' }))),
                react_1["default"].createElement(react_native_1.View, { style: styles.stopBtn },
                    react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: styles.stopBtn, onPress: onStopVideo },
                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { size: 50, name: 'stop' }))),
                react_1["default"].createElement(react_native_1.View, { style: styles.miniBtn },
                    react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: styles.miniBtn, onPress: null },
                        react_1["default"].createElement(styledComponents_1.Paragraph, null,
                            time,
                            "s")))))));
};
// define your styles
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000'
    },
    camera: {
        // flex:1,
        // height: '100%',
        height: '100%',
        width: '100%',
        position: 'absolute'
    },
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    icon: {
        margin: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 1,
        elevation: 0
    },
    recordButton: {
        backgroundColor: '#F35D6F',
        width: 72,
        height: 72,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
        margin: 12
    },
    ripple: {
        height: '100%',
        width: '100%'
    },
    recording: {
        flexDirection: 'row',
        top: 18,
        right: 12,
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 100
        // height:50,
        // paddingHorizontal:0,
    },
    recordingText: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 10
    },
    recordIndicator: {
        height: 15,
        width: 15,
        backgroundColor: 'red',
        marginLeft: 10,
        borderRadius: 100
    },
    recordBtns: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stopBtn: {
        backgroundColor: '#fff',
        width: 72,
        height: 72,
        borderRadius: 100,
        overflow: 'hidden',
        alignSelf: 'center',
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    miniBtn: {
        height: 54,
        width: 54,
        backgroundColor: 'rgba(0,0,0,0.25)',
        borderRadius: 100,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoContainer: {
        position: 'absolute',
        height: '100%',
        width: styledComponents_1.maxWidth,
        zIndex: 2
    },
    video: {
        height: '100%',
        width: '100%'
    },
    close: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        elevation: 0,
        zIndex: 1,
        left: 12,
        top: 12
    },
    send: {
        position: 'absolute',
        bottom: 12,
        right: 12
    },
    save: {
        position: 'absolute',
        elevation: 0,
        left: 12,
        bottom: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
// make this component available to the app
exports["default"] = VideoRecord;
