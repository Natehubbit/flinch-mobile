"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var useLoader_1 = require("../../hooks/useLoader");
var UploadHookService_1 = require("../../services/UploadHookService");
var AppOverlay = function (_a) {
    var children = _a.children;
    var _b = react_1.useState(0), progress = _b[0], setProgress = _b[1];
    var _c = useLoader_1.useLoader(), paymentLoader = _c.paymentLoader, responseLoader = _c.responseLoader, authLoader = _c.authLoader;
    react_1.useEffect(function () {
        var unsubscribe = UploadHookService_1["default"].uploadHookRef &&
            UploadHookService_1["default"].listen(setProgress);
        return function () { return unsubscribe && unsubscribe(); };
    }, [UploadHookService_1["default"].uploadHookRef]);
    var loading = paymentLoader || responseLoader;
    var renderSubmitting = function () {
        return react_1["default"].createElement(react_native_1.View, { style: [styles.submitting] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.submittingContent] },
                react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { color: theme_1.theme.colors.primary, style: [styles.submitLoader] }),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, "Submitting ")));
    };
    var renderUploading = function () {
        return react_1["default"].createElement(react_native_1.View, { style: [styles.progressContainer] },
            react_1["default"].createElement(styledComponents_1.AltMiniLabel, { black: true }, "Uploading"),
            react_1["default"].createElement(react_native_paper_1.ProgressBar, { progress: progress, style: [styles.progressBar], color: theme_1.theme.colors.primary }),
            react_1["default"].createElement(react_native_paper_1.Button, { icon: 'close', mode: 'contained', onPress: function () { return UploadHookService_1["default"].cancel(); }, color: theme_1.COLORS.red }, "Cancel"));
    };
    var renderLoader = function () {
        return react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { animating: true, size: "large", color: theme_1.theme.colors.primary });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        children,
        loading && react_1["default"].createElement(react_native_1.View, { style: styles.container },
            paymentLoader && renderLoader(),
            responseLoader && renderUploading(),
            authLoader && renderSubmitting())));
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
        height: '25%',
        width: '80%',
        borderRadius: 5
    }
});
