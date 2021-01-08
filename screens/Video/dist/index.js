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
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var VideoPlayer_1 = require("../../components/VideoPlayer");
var theme_1 = require("../../config/theme");
var native_1 = require("@react-navigation/native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var HelperService_1 = require("../../services/HelperService");
var useUser_1 = require("../../hooks/useUser");
var IconBtn_1 = require("../../components/IconBtn");
var constants_1 = require("../../common/constants");
var DownloadHookService_1 = require("../../services/DownloadHookService");
var Video = function () {
    var _a = react_1.useState(false), saving = _a[0], setSaving = _a[1];
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var displayName = useUser_1.useUser().displayName;
    var goBack = native_1.useNavigation().goBack;
    var _c = native_1.useRoute().params, 
    // id,
    // duration,
    name = _c.name, 
    // recipient,
    // date,
    url = _c.uri;
    var onShare = function () {
        HelperService_1["default"].shareMedia(displayName + " sent you a FLINCH from " + name + " at " + url);
    };
    var onSaveVideo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var label, uri, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setSaving(true);
                    label = Date.now() + '.mp4';
                    return [4 /*yield*/, DownloadHookService_1["default"]
                            .download(url, label + ".mp4", setProgress)];
                case 1:
                    uri = _b.sent();
                    _a = uri;
                    if (!_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, HelperService_1["default"]
                            .saveMedia(constants_1.VIDEO_SAVES, uri)];
                case 2:
                    _a = (_b.sent());
                    _b.label = 3;
                case 3:
                    _a;
                    setSaving(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(react_native_1.View, { style: [styles.head] },
            react_1["default"].createElement(expo_linear_gradient_1.LinearGradient, { colors: ['rgba(0,0,0,0.5)', 'transparent'], style: [styles.headContent] },
                react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'close', style: [styles.icon], small: true, onPress: goBack }))),
        react_1["default"].createElement(react_native_1.View, { style: [styles.videoContainer] },
            react_1["default"].createElement(VideoPlayer_1["default"], { uri: url }),
            react_1["default"].createElement(expo_linear_gradient_1.LinearGradient, { colors: ['transparent', 'rgba(0,0,0,0.5)'], style: [styles.btnsContainer] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.btns] }, !saving
                    ? react_1["default"].createElement(IconBtn_1["default"], { icon: 'cloud-download', onPress: onSaveVideo })
                    : react_1["default"].createElement(react_native_paper_1.FAB, { icon: null, loading: saving, label: progress + "% Downloading", uppercase: false, small: true, style: { backgroundColor: 'transparent', elevation: 0 } })),
                react_1["default"].createElement(react_native_1.View, { style: [styles.aside] },
                    react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'send', onPress: onShare, small: true }))))));
};
exports["default"] = Video;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    videoContainer: {
        flex: 1
    },
    videoInfo: {
        flex: 2
    },
    icon: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        elevation: 0,
        left: 15
    },
    aside: {
        alignItems: 'center'
    },
    head: {
        height: 60,
        zIndex: 1,
        width: '100%',
        position: 'absolute'
    },
    headContent: {
        flex: 1,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    btnsContainer: {
        position: 'absolute',
        bottom: 0,
        height: 80,
        paddingBottom: 2,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 15,
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    btn: {
        marginBottom: 15
    },
    btnLeft: {
        marginRight: 15
    },
    othersContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    videosContainer: {
        marginVertical: 18
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    name: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15
    },
    info: {
        justifyContent: 'space-between'
    },
    more: {
        justifyContent: 'center'
    },
    mini: {
        color: theme_1.COLORS.grey,
        fontSize: 10,
        marginLeft: 5
    },
    extraContainer: {
        flexDirection: 'row'
    },
    extra: {
        flexDirection: 'row',
        marginRight: 10
    }
});
