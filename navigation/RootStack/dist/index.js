"use strict";
exports.__esModule = true;
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var AppDrawer_1 = require("../AppDrawer");
var Notifications_1 = require("../../screens/Notifications");
var Search_1 = require("../../screens/Search");
var WebView_1 = require("../../screens/WebView");
var Video_1 = require("../../screens/Video");
var useNotifications_1 = require("../../hooks/useNotifications");
var Request_1 = require("../../screens/Request");
var Stack = stack_1.createStackNavigator();
var RootStack = function () {
    useNotifications_1["default"]();
    return (react_1["default"].createElement(Stack.Navigator, { mode: 'modal', headerMode: 'none' },
        react_1["default"].createElement(Stack.Screen, { name: "Home", component: AppDrawer_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'WebView', component: WebView_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Video", component: Video_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Notifications", component: Notifications_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Search', component: Search_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Request', component: Request_1["default"] })));
};
exports["default"] = RootStack;
