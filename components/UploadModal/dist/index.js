"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var useLoader_1 = require("../../hooks/useLoader");
var UploadHookService_1 = require("../../services/UploadHookService");
var loader_1 = require("../../store/loader");
var toast_1 = require("../../store/toast");
var UploadModal = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState(0), progress = _a[0], setProgress = _a[1];
    var _b = useLoader_1.useLoader().responseLoader, label = _b.label, showBtns = _b.showBtns, type = _b.type;
    react_1.useEffect(function () {
        var unsubscribe = UploadHookService_1["default"]
            .uploadHookRef &&
            UploadHookService_1["default"].listen(setProgress, onUploadError);
        return function () { return unsubscribe &&
            unsubscribe(); };
    }, [UploadHookService_1["default"].uploadHookRef]);
    var onUploadError = function () {
        dispatch(toast_1.toastActions
            .setToast({
            label: 'Retry',
            msg: 'An Error Occured...',
            show: true,
            onDismiss: onHideToast
        }));
    };
    var onHideToast = function () {
        dispatch(toast_1.toastActions.resetToast());
    };
    var onHideUpload = function () {
        dispatch(loader_1.loaderActions
            .loaded('responseLoader'));
    };
    var isProgress = type === 'progress';
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.progressContainer] },
        react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, label),
        isProgress
            ? react_1["default"].createElement(react_native_paper_1.ProgressBar, { progress: progress, style: [styles.progressBar], color: theme_1.theme.colors.primary })
            : react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { animating: true, size: 'large', color: theme_1.theme.colors.primary }),
        react_1["default"].createElement(react_native_1.View, { style: [styles.btns] }, showBtns &&
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_paper_1.Button, { color: theme_1.theme.colors.primary, onPress: onHideUpload }, "Hide"),
                react_1["default"].createElement(react_native_paper_1.Button, { onPress: function () { return UploadHookService_1["default"]
                        .cancel(onHideUpload); }, color: theme_1.COLORS.red }, "Cancel")))));
};
exports["default"] = UploadModal;
var styles = react_native_1.StyleSheet.create({
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
