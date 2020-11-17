"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var theme_1 = require("../../config/theme");
var AuthInput = function (_a) {
    var left = _a.left, right = _a.right, onIconClicked = _a.onIconClicked, style = _a.style, props = __rest(_a, ["left", "right", "onIconClicked", "style"]);
    return react_1["default"].createElement(react_native_paper_1.TextInput, __assign({}, props, { mode: 'flat', style: [styles.input, style], right: (right && react_1["default"].createElement(react_native_paper_1.TextInput.Icon, { onPress: onIconClicked, color: '#707577', name: right.toString() })) || null, left: typeof left === 'string'
            ? react_1["default"].createElement(react_native_paper_1.TextInput.Icon, { color: '#707577', name: left.toString() })
            : left }));
};
var styles = react_native_1.StyleSheet.create({
    input: {
        marginTop: 20,
        height: 54,
        backgroundColor: '#D5EEFA',
        borderBottomColor: theme_1.theme.colors.accent
    }
});
exports["default"] = react_native_paper_1.withTheme(AuthInput);
