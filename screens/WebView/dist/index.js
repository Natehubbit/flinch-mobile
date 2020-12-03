"use strict";
exports.__esModule = true;
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var react_native_1 = require("react-native");
var react_native_webview_1 = require("react-native-webview");
var PaymentService_1 = require("../../services/PaymentService");
var useRequest_1 = require("../../hooks/useRequest");
var react_redux_1 = require("react-redux");
var toast_1 = require("../../store/toast");
var theme_1 = require("../../config/theme");
var Navbar_1 = require("../../components/Navbar");
var react_native_paper_1 = require("react-native-paper");
var WebViewScreen = function () {
    var dispatch = react_redux_1.useDispatch();
    var params = native_1.useRoute().params;
    var _a = react_1.useState(0), progress = _a[0], setProgress = _a[1];
    var _b = native_1.useNavigation(), goBack = _b.goBack, reset = _b.reset;
    var uri = params.uri;
    var id = useRequest_1.useRequest().id;
    var showProgress = progress === 1;
    if (!uri) {
        goBack();
        return null;
    }
    react_1.useEffect(function () {
        PaymentService_1["default"].onPayed(id, onComplete);
    }, []);
    var onProgress = function (e) {
        var nativeEvent = e.nativeEvent;
        setProgress(nativeEvent.progress);
    };
    var onComplete = function () {
        reset({
            index: 0,
            routes: [{ name: 'Home', key: null }]
        });
        dispatch(toast_1.toastActions.setToast({
            label: 'Completed',
            msg: 'Payment Completed',
            show: true,
            duration: 10000,
            onDismiss: function () { return dispatch(toast_1.toastActions.resetToast()); },
            onPress: function () { return dispatch(toast_1.toastActions.resetToast()); }
        }));
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], { title: 'Make Payment' }),
        react_1["default"].createElement(react_native_webview_1.WebView, { onLoadEnd: params === null || params === void 0 ? void 0 : params.onStopLoading, incognito: true, pullToRefreshEnabled: true, urlPrefixesForDefaultIntent: [], style: styles.container, onLoadProgress: onProgress, source: { uri: uri }, onError: params === null || params === void 0 ? void 0 : params.onStopLoading }),
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
