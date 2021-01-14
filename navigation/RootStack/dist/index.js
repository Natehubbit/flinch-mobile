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
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var AppDrawer_1 = require("../AppDrawer");
var Notifications_1 = require("../../screens/Notifications");
var Search_1 = require("../../screens/Search");
var Video_1 = require("../../screens/Video");
var useNotifications_1 = require("../../hooks/useNotifications");
var Request_1 = require("../../screens/Request");
var VideoUpload_1 = require("../../screens/VideoUpload");
var VideoRecord_1 = require("../../screens/VideoRecord");
var constants_1 = require("../../common/constants");
var Payment_1 = require("../../screens/Payment");
var Stack = stack_1.createStackNavigator();
var RootStack = function () {
    useNotifications_1["default"]();
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: __assign({}, constants_1.SLIDE_ANIMATION), mode: "modal", headerMode: "none" },
        react_1["default"].createElement(Stack.Screen, { name: "Home", component: AppDrawer_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Payment", component: Payment_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Video", component: Video_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Notifications", component: Notifications_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Search", component: Search_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Request", component: Request_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "VideoUpload", component: VideoUpload_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "RecordVideo", component: VideoRecord_1["default"] })));
};
exports["default"] = RootStack;
