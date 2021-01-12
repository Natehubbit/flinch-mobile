"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var react_native_1 = require("react-native");
var react_native_webview_1 = require("react-native-webview");
var theme_1 = require("../../config/theme");
var Navbar_1 = require("../../components/Navbar");
var react_native_paper_1 = require("react-native-paper");
var constants_1 = require("../../common/constants");
var WebViewScreen = function (_a) {
    var navigation = _a.navigation;
    var params = native_1.useRoute().params;
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var goBack = native_1.useNavigation().goBack;
    var uri = params.uri;
    var showProgress = progress === 1;
    if (!uri) {
        goBack();
        return null;
    }
    var onProgress = function (e) {
        var nativeEvent = e.nativeEvent;
        setProgress(nativeEvent.progress);
    };
    var onComplete = function () {
        navigation.popToTop();
    };
    var onCallbackUrl = function (e) {
        var url = e.url;
        var isCallback = url.includes(constants_1.PAYMENT_CALLBACK);
        isCallback && onComplete();
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], { title: 'Make Payment', hideBell: true }),
        react_1["default"].createElement(react_native_webview_1.WebView, { onLoadEnd: params === null || params === void 0 ? void 0 : params.onStopLoading, incognito: true, pullToRefreshEnabled: true, urlPrefixesForDefaultIntent: [], style: styles.container, onLoadProgress: onProgress, source: { uri: uri }, onError: params === null || params === void 0 ? void 0 : params.onStopLoading, onNavigationStateChange: onCallbackUrl }),
        !showProgress && react_1["default"].createElement(react_native_paper_1.ProgressBar, { progress: progress })));
};
exports["default"] = WebViewScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        backgroundColor: theme_1.theme.colors.primary
    }
});
