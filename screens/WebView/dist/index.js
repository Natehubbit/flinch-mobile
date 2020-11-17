"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var React = require("react");
var react_native_1 = require("react-native");
var react_native_webview_1 = require("react-native-webview");
var WebViewScreen = function () {
    var params = native_1.useRoute().params;
    var goBack = native_1.useNavigation().goBack;
    var uri = params.uri;
    if (!uri) {
        goBack();
        return null;
    }
    return (React.createElement(react_native_webview_1.WebView, { onLoadEnd: params === null || params === void 0 ? void 0 : params.onStopLoading, pullToRefreshEnabled: true, urlPrefixesForDefaultIntent: [], style: styles.container, source: { uri: uri }, onError: params === null || params === void 0 ? void 0 : params.onStopLoading }));
};
exports["default"] = WebViewScreen;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
