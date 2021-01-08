"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Navbar_1 = require("../../components/Navbar");
var NotificationCard_1 = require("../../components/NotificationCard");
var Notifications = function () {
    var name = native_1.useRoute().name;
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
        react_1["default"].createElement(Navbar_1["default"], { title: name, hideBell: true, left: 'back-arrow' }),
        react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, null,
            react_1["default"].createElement(NotificationCard_1["default"], null),
            react_1["default"].createElement(NotificationCard_1["default"], null),
            react_1["default"].createElement(NotificationCard_1["default"], { viewed: true }))));
};
exports["default"] = Notifications;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
