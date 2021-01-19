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
var Input_1 = require("../../components/Input");
var forgot_svg_1 = require("../../assets/images/forgot.svg");
var styledComponents_1 = require("../../common/styledComponents");
var FormService_1 = require("../../services/FormService");
var AuthService_1 = require("../../services/AuthService");
var react_redux_1 = require("react-redux");
var toast_1 = require("../../store/toast");
var native_1 = require("@react-navigation/native");
var ForgotPass = function () {
    var _a = react_1.useState(''), email = _a[0], setEmail = _a[1];
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(false), proceed = _b[0], setProceed = _b[1];
    var _c = react_1.useState(false), sending = _c[0], setSending = _c[1];
    var goBack = native_1.useNavigation().goBack;
    var onChange = function (input) {
        setEmail(input);
        setProceed(FormService_1.FormService.validateEmail(input));
    };
    var onProceed = function () { return __awaiter(void 0, void 0, void 0, function () {
        var resetEmailSent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSending(true);
                    return [4 /*yield*/, AuthService_1["default"].resetPass(email)];
                case 1:
                    resetEmailSent = _a.sent();
                    if (resetEmailSent) {
                        goBack();
                        dispatch(toast_1.toastActions
                            .setToast({
                            label: 'Okay',
                            msg: 'Reset email sent.',
                            show: true,
                            mode: 'info'
                        }));
                    }
                    else {
                        dispatch(toast_1.toastActions
                            .setToast({
                            label: 'Okay',
                            msg: 'Failed to send reset email.',
                            show: true,
                            mode: 'danger'
                        }));
                    }
                    setSending(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, null,
        react_1["default"].createElement(react_native_1.ScrollView, { keyboardShouldPersistTaps: 'handled', contentContainerStyle: [styles.container] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.header] },
                react_1["default"].createElement(react_native_1.Text, { style: [styles.title] }, "Forgot Password")),
            react_1["default"].createElement(react_native_1.View, { style: [styles.backImage] },
                react_1["default"].createElement(forgot_svg_1["default"], { height: styledComponents_1.maxHeight * 0.2, width: styledComponents_1.maxWidth * 0.5 })),
            react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, "Reset your password by entering your email"),
                react_1["default"].createElement(Input_1["default"], { placeholder: 'Email', keyboardType: 'email-address', onChangeText: onChange, value: email }),
                react_1["default"].createElement(react_native_1.View, { style: [styles.proceed] },
                    react_1["default"].createElement(react_native_paper_1.FAB, { style: [styles.fab], icon: 'arrow-right', disabled: !proceed || sending, onPress: onProceed, loading: sending }))))));
};
exports["default"] = ForgotPass;
var styles = react_native_1.StyleSheet.create({
    container: {
    // height: maxHeight - 10
    },
    proceed: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginVertical: 10
    },
    content: {
        padding: 45,
        height: '100%'
    },
    header: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontFamily: 'SuezOne-Regular'
    },
    backImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    fab: {}
});
