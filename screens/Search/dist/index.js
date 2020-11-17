"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var Search = function () {
    var _a = react_1.useState(''), input = _a[0], setInput = _a[1];
    var goBack = native_1.useNavigation().goBack;
    var onClose = function () { return goBack(); };
    var onSearch = function () {
        console.log('searching ', input);
    };
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_paper_1.Searchbar, { value: input, onChangeText: setInput, onIconPress: onSearch, placeholder: 'Search', style: styles.search }),
        react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'close', style: styles.fab, onPress: onClose }));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        bottom: 12,
        right: 12
    },
    search: {}
});
exports["default"] = Search;
