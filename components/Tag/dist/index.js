"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("../../config/theme");
var Tag = function (props) {
    var label = props.label;
    var color = (label === 'failed' || label === 'urgent')
        ? 'red'
        : label === 'pending'
            ? theme_1.theme.colors.primary
            : '#3ACC6C';
    return react_1["default"].createElement(react_native_paper_1.Badge, { visible: true, style: [styles.badge, { backgroundColor: color }] }, label);
};
var styles = react_native_1.StyleSheet.create({
    badge: {
        fontWeight: 'bold',
        color: '#fff'
    }
});
exports["default"] = Tag;
