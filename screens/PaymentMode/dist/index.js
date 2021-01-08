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
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_paper_1 = require("react-native-paper");
var constants_1 = require("../../common/constants");
var vector_icons_1 = require("@expo/vector-icons");
var PaymentService_1 = require("../../services/PaymentService");
var useUser_1 = require("../../hooks/useUser");
var loader_1 = require("../../store/loader");
var react_redux_1 = require("react-redux");
var useRequest_1 = require("../../hooks/useRequest");
var native_1 = require("@react-navigation/native");
var PaymentMode = function () {
    var dispatch = react_redux_1.useDispatch();
    var request = useRequest_1.useRequest();
    var navigate = native_1.useNavigation().navigate;
    var cost = request.price.toString();
    var _a = useUser_1.useUser(), id = _a.id, displayName = _a.displayName, email = _a.email;
    var onSelect = function (type) { return __awaiter(void 0, void 0, void 0, function () {
        var isCreditCard, uri;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dispatch(loader_1.loaderActions.loading('paymentLoader'));
                    isCreditCard = type === 'Credit Card';
                    uri = null;
                    if (!isCreditCard) return [3 /*break*/, 2];
                    return [4 /*yield*/, makePayment('card', cost)];
                case 1:
                    uri = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, makePayment('mobile_money', cost)];
                case 3:
                    uri = _a.sent();
                    _a.label = 4;
                case 4:
                    uri
                        ? navigate('WebView', { uri: uri, onStopLoading: onStopLoading })
                        : react_native_1.Alert.alert('Error', 'Failed to launch Payment Widget');
                    onStopLoading();
                    return [2 /*return*/];
            }
        });
    }); };
    var onStopLoading = function () {
        dispatch(loader_1.loaderActions.loaded('paymentLoader'));
    };
    var makePayment = function (mode, amount) { return __awaiter(void 0, void 0, void 0, function () {
        var data, url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, PaymentService_1["default"].init({
                        amount: amount,
                        callback_url: constants_1.PAYMENT_CALLBACK,
                        channels: [mode],
                        currency: 'GHS',
                        email: email,
                        label: displayName,
                        metadata: {
                            customerName: displayName,
                            requestId: request.id,
                            id: id,
                            data: request
                        }
                    })];
                case 1:
                    data = _a.sent();
                    if (!data)
                        return [2 /*return*/, null];
                    url = data.authorization_url;
                    return [2 /*return*/, url];
            }
        });
    }); };
    var renderIcon = function (icon) {
        return (react_1["default"].createElement(react_native_1.View, { style: styles.logoContainer },
            react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: icon, size: 25 })));
    };
    var renderOptions = function () {
        return constants_1.PAYMENT_OPTIONS.map(function (_a) {
            var label = _a.label, icon = _a.icon;
            return (react_1["default"].createElement(react_native_paper_1.List.Item, { key: label, onPress: function () { return onSelect(label); }, title: label, left: function () { return renderIcon(icon); }, style: styles.listItem }));
        });
    };
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { style: styles.scroll }, renderOptions()));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    scroll: {
    // paddingTop:10,s
    },
    listItem: {
        elevation: 1.5,
        marginVertical: 7,
        backgroundColor: '#fff',
        height: 54,
        marginHorizontal: 12
    },
    logo: {
        height: 33,
        width: 33
    },
    logoContainer: {
        height: '100%',
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    }
});
exports["default"] = PaymentMode;
