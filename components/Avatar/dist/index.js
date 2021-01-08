"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var vector_icons_1 = require("@expo/vector-icons");
var theme_1 = require("../../config/theme");
var Avatar = function (_a) {
    var onPress = _a.onPress, source = _a.source, style = _a.style;
    var showImage = source.length > 0;
    return react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: [styles.container, style && style], onPress: onPress },
        react_1["default"].createElement(react_native_1.View, { style: [styles.container] }, showImage
            ? react_1["default"].createElement(react_native_1.Image, { source: { uri: source }, style: styles.img })
            : react_1["default"].createElement(vector_icons_1.MaterialIcons, { name: 'add', size: 25, style: styles.icon })));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        borderRadius: 100,
        height: 100,
        width: 100,
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    icon: {
        color: theme_1.theme.colors.primary
    },
    img: {
        height: '100%',
        width: '100%'
    }
});
exports["default"] = Avatar;
