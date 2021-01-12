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
var styledComponents_1 = require("../../common/styledComponents");
var Input_1 = require("../../components/Input");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("../../config/theme");
var native_1 = require("@react-navigation/native");
var user_1 = require("../../store/user");
var react_redux_1 = require("react-redux");
// import ModalLoader from '../../components/ModalLoader'
// import { useLoader } from '../../hooks/useLoader'
var Login = function () {
    var dispatch = react_redux_1.useDispatch();
    var navigate = native_1.useNavigation().navigate;
    // const { authLoader } = useLoader()
    var _a = react_1.useState(false), showPass = _a[0], setShowPass = _a[1];
    var _b = react_1.useState(''), email = _b[0], setEmail = _b[1];
    var _c = react_1.useState(''), pass = _c[0], setPass = _c[1];
    var onSignup = function () { return navigate('Signup'); };
    var onShowPass = function () { return setShowPass(!showPass); };
    var onLogin = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            dispatch(user_1.userActions.login(email, pass));
            return [2 /*return*/];
        });
    }); };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.ImageBackground, { source: require('../../assets/images/loginBack.jpg'), style: styles.background }),
        react_1["default"].createElement(styledComponents_1.AuthContainer, { keyboardShouldPersistTaps: 'handled' },
            react_1["default"].createElement(styledComponents_1.FormContainer, null,
                react_1["default"].createElement(styledComponents_1.FlexContainer, { flex: 1, justify: 'flex-end' },
                    react_1["default"].createElement(styledComponents_1.MainTitle, null, "Welcome")),
                react_1["default"].createElement(styledComponents_1.FlexContainer, { flex: 1, justify: 'center' },
                    react_1["default"].createElement(styledComponents_1.Paragraph, null,
                        "Enter your details and get",
                        '\n',
                        "connected with your favorite celebrity.")),
                react_1["default"].createElement(styledComponents_1.FlexContainer, { flex: 2.5 },
                    react_1["default"].createElement(Input_1["default"], { keyboardType: 'email-address', left: 'account', label: 'Email', onChangeText: setEmail }),
                    react_1["default"].createElement(Input_1["default"], { left: 'lock', right: 'eye', label: 'Password', secureTextEntry: !showPass, onIconClicked: onShowPass, onChangeText: setPass })),
                react_1["default"].createElement(styledComponents_1.FlexContainer, { justify: 'space-between', flex: 2 },
                    react_1["default"].createElement(styledComponents_1.FlexContainer, null,
                        react_1["default"].createElement(react_native_paper_1.Button, { uppercase: false, theme: { roundness: 100 }, mode: 'contained', onPress: onLogin }, "Login")),
                    react_1["default"].createElement(styledComponents_1.FlexContainer, { justify: 'center', align: 'center' },
                        react_1["default"].createElement(styledComponents_1.Paragraph, null, "or")),
                    react_1["default"].createElement(styledComponents_1.FlexContainer, { justify: 'space-around', direction: 'row' },
                        react_1["default"].createElement(react_native_paper_1.IconButton, { icon: 'google', color: 'red', style: styles.iconBack, onPress: function () { return console.log('hel'); }, rippleColor: theme_1.theme.colors.primary }),
                        react_1["default"].createElement(react_native_paper_1.IconButton, { rippleColor: theme_1.theme.colors.primary, icon: 'facebook', color: 'blue', style: styles.iconBack })),
                    react_1["default"].createElement(styledComponents_1.FlexContainer, { direction: 'row', justify: 'center', align: 'center' },
                        react_1["default"].createElement(styledComponents_1.Paragraph, null, "Don't have an account?"),
                        react_1["default"].createElement(react_native_paper_1.Button, { labelStyle: styles.btnLabel, onPress: onSignup, uppercase: false }, "SignUp")))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        height: styledComponents_1.maxHeight,
        width: styledComponents_1.maxWidth
    },
    iconBack: {
        backgroundColor: '#fff'
    },
    btnLabel: {
        marginHorizontal: 0
    }
});
exports["default"] = Login;
