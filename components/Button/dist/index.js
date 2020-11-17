"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("../../config/theme");
var Button = function (_a) {
    var label = _a.label, type = _a.type, onPress = _a.onPress, loading = _a.loading, disabled = _a.disabled;
    var primary = theme_1.theme.colors.primary;
    var _b = type === 'outline'
        ? { text: primary, back: '#fff', border: 2 }
        : { text: '#fff', back: primary, border: 0 }, text = _b.text, back = _b.back, border = _b.border;
    return (react_1["default"].createElement(react_native_paper_1.Button, { onPress: onPress, style: [styles.container, { borderWidth: border }], color: back, labelStyle: { color: text }, mode: 'contained', theme: { roundness: 100 }, loading: loading, disabled: disabled }, label));
};
// define your styles
var styles = react_native_1.StyleSheet.create({
    container: {
        width: 0,
        minWidth: 150,
        borderWidth: 2,
        borderColor: theme_1.theme.colors.primary
    }
});
// make this component available to the app
exports["default"] = Button;
