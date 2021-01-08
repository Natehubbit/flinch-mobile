"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var SearchItem = function (_a) {
    var uri = _a.uri, label = _a.label, onPress = _a.onPress;
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onPress, style: [styles.container] },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: [styles.img] }),
                react_1["default"].createElement(react_native_1.View, { style: [styles.label] },
                    react_1["default"].createElement(react_native_paper_1.Paragraph, null, label))))));
};
exports["default"] = SearchItem;
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 17
    },
    img: {
        height: 39,
        width: 39,
        borderRadius: 100
    },
    label: {
        justifyContent: 'center',
        marginLeft: 17
    }
});
