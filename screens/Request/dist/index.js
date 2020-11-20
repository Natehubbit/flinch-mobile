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
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var useUser_1 = require("../../hooks/useUser");
var vector_icons_1 = require("@expo/vector-icons");
var play_svg_1 = require("../../assets/images/play.svg");
var Tag_1 = require("../../components/Tag");
var Button_1 = require("../../components/Button");
var native_1 = require("@react-navigation/native");
var useRequests_1 = require("../../hooks/useRequests");
var constants_1 = require("../../common/constants");
var HelperService_1 = require("../../services/HelperService");
var requests_1 = require("../../store/requests");
var Request = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(false), rejecting = _a[0], setRejecting = _a[1];
    var _b = useUser_1.useUser(), uri = _b.imageUrl, role = _b.role;
    var _c = native_1.useNavigation(), navigate = _c.navigate, goBack = _c.goBack;
    var params = native_1.useRoute().params;
    var id = params.id;
    var _d = useRequests_1.useRequests('id', id)[0] || constants_1.initStateRequest, occasion = _d.occasion, status = _d.status, instructions = _d.instructions, recipient = _d.recipient, price = _d.price, name = _d.celebrity.name, _e = _d.response, duration = _e.duration, timestamp = _e.timestamp;
    var summarize = instructions.length > 99;
    var info = summarize
        ? instructions.substring(0, 99)
        : instructions;
    var summarizeText = summarize
        ? 'see more'
        : 'see less';
    var isUser = role === 'user';
    var isSuccess = status === 'success';
    var isPending = status === 'pending';
    var showButtons = !isUser && isPending;
    var onAccept = function () { return navigate('VideoUpload', { id: id }); };
    var onOpenVideo = function () { return navigate('Video', {
        id: id,
        duration: duration,
        recipient: recipient,
        timestamp: timestamp,
        name: name
    }); };
    var onReject = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setRejecting(true);
            dispatch(requests_1.requestsActions.rejectRequest(id, rejectCallback));
            return [2 /*return*/];
        });
    }); };
    var rejectCallback = function () {
        goBack();
        setRejecting(false);
    };
    return react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_1.ScrollView, { style: styles.container },
            react_1["default"].createElement(react_native_1.View, { style: styles.panelContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles.panel },
                    react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: styles.img }),
                    react_1["default"].createElement(react_native_1.View, { style: styles.panelContent },
                        react_1["default"].createElement(react_native_1.View, { style: styles.userInfo },
                            react_1["default"].createElement(styledComponents_1.MiniLabel, { numberOfLines: 1, style: styles.name }, name),
                            react_1["default"].createElement(react_native_1.View, null,
                                react_1["default"].createElement(Tag_1["default"], { label: status }))),
                        react_1["default"].createElement(react_native_paper_1.Divider, null),
                        react_1["default"].createElement(react_native_1.View, { style: styles.details },
                            react_1["default"].createElement(styledComponents_1.SubHeading, { style: styles.miniHead }, "Instructions"),
                            react_1["default"].createElement(styledComponents_1.Paragraph, { black: true },
                                info,
                                summarize && react_1["default"].createElement(styledComponents_1.Paragraph, { link: true }, summarizeText))),
                        isSuccess && react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_paper_1.Divider, { style: [styles.div] }),
                            react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onOpenVideo, style: { flex: 1 } },
                                react_1["default"].createElement(react_native_1.View, { style: styles.videoContainer },
                                    react_1["default"].createElement(react_native_1.View, { style: styles.video },
                                        react_1["default"].createElement(react_native_paper_1.TouchableRipple, null,
                                            react_1["default"].createElement(play_svg_1["default"], null))),
                                    react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: styles.videoLabel },
                                        occasion,
                                        '\n',
                                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'clock', color: 'rgba(0,0,0,0.5)' }),
                                        react_1["default"].createElement(styledComponents_1.MiniLabel, { numberOfLines: 1, style: styles.duration }, "50s"))))),
                        react_1["default"].createElement(react_native_paper_1.Divider, { style: [styles.div] }),
                        react_1["default"].createElement(react_native_1.View, { style: styles.bottom },
                            react_1["default"].createElement(react_native_1.View, { style: styles.bottomLabel },
                                react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'account', color: 'rgba(0,0,0,0.5)' }),
                                react_1["default"].createElement(styledComponents_1.MiniLabel, { numberOfLines: 1, style: styles.bottomText }, recipient)),
                            react_1["default"].createElement(react_native_1.View, { style: styles.bottomLabel },
                                react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'wallet', color: 'rgba(0,0,0,0.5)' }),
                                react_1["default"].createElement(styledComponents_1.MiniLabel, { numberOfLines: 1, style: styles.bottomText }, HelperService_1["default"].parseToMoney(price)))))))),
        showButtons && react_1["default"].createElement(react_native_1.View, { style: styles.buttons },
            react_1["default"].createElement(Button_1["default"], { onPress: onAccept, label: 'Accept', disabled: rejecting }),
            react_1["default"].createElement(Button_1["default"], { onPress: onReject, label: 'Reject', type: 'outline', loading: rejecting, disabled: rejecting })));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: '100%'
    },
    panelContainer: {
        paddingTop: 100,
        paddingHorizontal: 35
    },
    panel: {
        borderRadius: 15,
        paddingVertical: 25,
        elevation: 2,
        marginBottom: 15,
        backgroundColor: '#fff'
    },
    panelContent: {
        marginTop: 25
    },
    img: {
        height: 86,
        width: 86,
        borderRadius: 100,
        position: 'absolute',
        top: -45,
        alignSelf: 'center'
    },
    userInfo: {
        alignItems: 'center',
        marginBottom: 20,
        width: '70%',
        alignSelf: 'center',
        flexDirection: 'column'
    },
    name: {
        fontSize: 15,
        marginVertical: 5
    },
    details: {
        paddingTop: 11,
        paddingBottom: 19,
        paddingHorizontal: 9
    },
    miniHead: {
        fontSize: 12,
        marginBottom: 10
    },
    see: {
        margin: 0
    },
    seeLabel: {
        fontSize: 10,
        textTransform: 'none',
        marginVertical: 0,
        marginHorizontal: 0
    },
    videoContainer: {
        padding: 9,
        flexDirection: 'row',
        alignItems: 'center'
    },
    video: {
        height: 60,
        backgroundColor: '#000',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoLabel: {
        marginLeft: 15
    },
    duration: {
        lineHeight: 25,
        fontSize: 12
    },
    durationIcon: {
        opacity: 0.5
    },
    bottom: {
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    bottomLabel: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bottomText: {
        fontSize: 15
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 11,
        paddingHorizontal: 25
    },
    div: {
        height: 1
    }
});
exports["default"] = Request;
