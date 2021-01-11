"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var useToast_1 = require("../../hooks/useToast");
var toast_1 = require("../../store/toast");
var Toast = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = useToast_1.useToast(), onDismiss = _a.onDismiss, onPress = _a.onPress, mode = _a.mode, msg = _a.msg, show = _a.show, label = _a.label, duration = _a.duration;
    var style = mode === 'danger'
        ? { backgroundColor: theme_1.COLORS.red, color: theme_1.COLORS.dark }
        : mode === 'info'
            ? { backgroundColor: theme_1.theme.colors.primary, color: theme_1.COLORS.dark }
            : mode === 'success'
                ? { backgroundColor: theme_1.COLORS.success, color: theme_1.COLORS.dark }
                : null;
    var dismiss = function () {
        dispatch(toast_1.toastActions.resetToast());
    };
    return (react_1["default"].createElement(react_native_paper_1.Snackbar, { style: style, visible: show, theme: { colors: { accent: style && style.color } }, onDismiss: onDismiss || dismiss, duration: duration, action: {
            label: label,
            onPress: (onPress && onPress) ||
                dismiss
        } },
        react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, msg)));
};
exports["default"] = Toast;
