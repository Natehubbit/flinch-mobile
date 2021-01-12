"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Navbar_1 = require("../../components/Navbar");
var NotificationCard_1 = require("../../components/NotificationCard");
var useNotifications_1 = require("../../hooks/useNotifications");
var moment_1 = require("moment");
var Notifications = function () {
    var name = native_1.useRoute().name;
    var list = useNotifications_1["default"]().notificationList;
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
        react_1["default"].createElement(Navbar_1["default"], { title: name, hideBell: true, left: 'back-arrow' }),
        react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, null, list.map(function (notification) { return (react_1["default"].createElement(NotificationCard_1["default"], { id: notification.id, msg: notification.body, key: notification.id, read: notification.read, data: notification.data, time: moment_1["default"](notification.createdAt).fromNow() })); }))));
};
exports["default"] = Notifications;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    }
});
