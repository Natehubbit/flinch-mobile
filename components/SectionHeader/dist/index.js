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
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var SectionHeader = function (_a) {
    var title = _a.title, props = __rest(_a, ["title"]);
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(styledComponents_1.SubHeading, __assign({}, props), title),
        react_1["default"].createElement(react_native_1.View, { style: styles.line }));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: 25,
        marginLeft: 12
    },
    line: {
        height: 5,
        width: 17,
        position: 'absolute',
        left: 0,
        backgroundColor: theme_1.theme.colors.primary,
        bottom: 0,
        borderRadius: 100
    }
});
exports["default"] = SectionHeader;
