"use strict";
exports.__esModule = true;
var react_1 = require("react");
var expo_av_1 = require("expo-av");
var react_native_1 = require("react-native");
var theme_1 = require("../../config/theme");
var VideoPlayer = function (_a) {
    var uri = _a.uri;
    return (react_1["default"].createElement(expo_av_1.Video, { source: { uri: uri }, rate: 1.0, volume: 1.0, isMuted: false, resizeMode: "contain", shouldPlay: true, isLooping: true, useNativeControls: true, style: [styles.container] }));
};
exports["default"] = VideoPlayer;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme_1.COLORS.dark
    }
});
