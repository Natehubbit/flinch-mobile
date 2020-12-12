"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var selector_1 = require("../../hooks/selector");
var useLoader_1 = require("../../hooks/useLoader");
var useToast_1 = require("../../hooks/useToast");
var UploadHookService_1 = require("../../services/UploadHookService");
var loader_1 = require("../../store/loader");
var toast_1 = require("../../store/toast");
var Selector_1 = require("../Selector");
var AppOverlay = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    var dispatch = react_redux_1.useDispatch();
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var _c = useLoader_1.useLoader(), paymentLoader = _c.paymentLoader, responseLoader = _c.responseLoader, authLoader = _c.authLoader;
    var showSelector = selector_1.useSelect().show;
    var _d = useToast_1.useToast(), onDismiss = _d.onDismiss, onPress = _d.onPress, mode = _d.mode, msg = _d.msg, show = _d.show, label = _d.label, duration = _d.duration;
    var style = mode === 'danger'
        ? { backgroundColor: theme_1.COLORS.red, color: theme_1.COLORS.dark }
        : mode === 'info'
            ? { backgroundColor: theme_1.theme.colors.primary, color: theme_1.COLORS.dark }
            : mode === 'success'
                ? { backgroundColor: theme_1.COLORS.success, color: theme_1.COLORS.dark }
                : null;
    react_1.useEffect(function () {
        var unsubscribe = UploadHookService_1["default"].uploadHookRef &&
            UploadHookService_1["default"].listen(setProgress, onUploadError, onUploadComplete);
        return function () { return unsubscribe && unsubscribe(); };
    }, [UploadHookService_1["default"].uploadHookRef]);
    var loading = paymentLoader ||
        responseLoader ||
        authLoader ||
        showSelector;
    var onUploadError = function () {
        dispatch(toast_1.toastActions.setToast({
            label: 'Retry',
            msg: 'An Error Occured during upload...',
            show: true,
            onDismiss: onHideToast,
            onPress: onPress
        }));
    };
    var onHideToast = function () {
        dispatch(toast_1.toastActions.resetToast());
    };
    var onHideUpload = function () {
        dispatch(loader_1.loaderActions.loaded('responseLoader'));
    };
    var onUploadComplete = function () {
        dispatch(toast_1.toastActions.setToast({
            show: true,
            label: 'Okay',
            msg: 'Upload completed',
            mode: 'success',
            onDismiss: onHideToast,
            onPress: onHideToast
        }));
        onHideUpload();
    };
    var renderSubmitting = function () {
        return react_1["default"].createElement(react_native_1.View, { style: [styles.submitting] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.submittingContent] },
                react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { color: theme_1.theme.colors.primary, style: [styles.submitLoader] }),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, "Submitting ")));
    };
    var renderUploading = function () {
        return react_1["default"].createElement(react_native_1.View, { style: [styles.progressContainer] },
            react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, "Uploading"),
            react_1["default"].createElement(react_native_paper_1.ProgressBar, { progress: progress, style: [styles.progressBar], color: theme_1.theme.colors.primary }),
            react_1["default"].createElement(react_native_1.View, { style: [styles.btns] },
                react_1["default"].createElement(react_native_paper_1.Button, { color: theme_1.theme.colors.primary, onPress: onHideUpload }, "Hide"),
                react_1["default"].createElement(react_native_paper_1.Button, { onPress: function () { return UploadHookService_1["default"].cancel(); }, color: theme_1.COLORS.red }, "Cancel")));
    };
    var renderLoader = function () {
        return react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { animating: true, size: "large", color: theme_1.theme.colors.primary });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        children,
        loading && react_1["default"].createElement(react_native_1.View, { style: styles.container },
            paymentLoader && renderLoader(),
            responseLoader && renderUploading(),
            authLoader && renderSubmitting(),
            react_1["default"].createElement(Selector_1["default"], null)),
        react_1["default"].createElement(react_native_paper_1.Snackbar, { style: style, visible: show, theme: { colors: { accent: style && style.color } }, onDismiss: onDismiss, duration: duration, action: {
                label: label,
                onPress: onPress
            } },
            react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, msg))));
};
exports["default"] = AppOverlay;
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
    },
    submitLoader: {
        marginRight: 10
    },
    submitting: {
        height: '25%',
        width: '70%',
        backgroundColor: theme_1.COLORS.white,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    submittingContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    progressBar: {
        width: styledComponents_1.maxWidth * 0.5,
        height: 5
    },
    progressContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: theme_1.COLORS.white,
        height: '30%',
        width: '80%',
        borderRadius: 5
    },
    btns: {
        flexDirection: 'row'
    }
});
