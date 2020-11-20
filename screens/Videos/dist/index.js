"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var DATA = [
    1, 2, 3, 4, 5, 6, 7, 8
];
function Videos() {
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(react_native_gesture_handler_1.FlatList, { data: DATA, renderItem: function () { return react_1["default"].createElement(react_native_1.Text, null, "1"); }, keyExtractor: function (item) { return item.toString(); } })));
}
exports["default"] = Videos;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
