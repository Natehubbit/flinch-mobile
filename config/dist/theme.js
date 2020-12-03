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
exports.__esModule = true;
exports.settings = exports.COLORS = exports.theme = void 0;
var react_native_paper_1 = require("react-native-paper");
exports.theme = __assign(__assign({}, react_native_paper_1.DefaultTheme), { colors: __assign(__assign({}, react_native_paper_1.DefaultTheme.colors), { primary: '#00A3FF', accent: '#00A3FF' }) });
exports.COLORS = {
    white: '#fff',
    red: '#cc0e74',
    warn: '#ff9966',
    success: '#3ACC6C',
    dark: '#000',
    grey: '#808080',
    light: 'rgba(0,0,0,0.5)'
};
exports.settings = {};
