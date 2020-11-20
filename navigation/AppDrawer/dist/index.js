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
var drawer_1 = require("@react-navigation/drawer");
var HomeStack_1 = require("../HomeStack");
var RequestStack_1 = require("../RequestStack");
var Drawer_1 = require("../../components/Drawer");
var stack_1 = require("@react-navigation/stack");
var WebView_1 = require("../../screens/WebView");
var VideoStack_1 = require("../VideoStack");
var Video_1 = require("../../screens/Video");
var Drawer = drawer_1.createDrawerNavigator();
var AppDrawer = function () {
    return (react_1["default"].createElement(Drawer.Navigator, { drawerContent: function (props) { return react_1["default"].createElement(Drawer_1["default"], __assign({}, props)); }, initialRouteName: "Home", screenOptions: {
            header: function () { return null; }
        } },
        react_1["default"].createElement(Drawer.Screen, { name: "Home", component: HomeStack_1["default"] }),
        react_1["default"].createElement(Drawer.Screen, { name: "Requests", component: RequestStack_1["default"] }),
        react_1["default"].createElement(Drawer.Screen, { name: "Videos", component: VideoStack_1["default"] })));
};
var Stack = stack_1.createStackNavigator();
var AppDrawerRoot = function () {
    return (react_1["default"].createElement(Stack.Navigator, { mode: 'modal', headerMode: 'none' },
        react_1["default"].createElement(Stack.Screen, { name: "Home", component: AppDrawer }),
        react_1["default"].createElement(Stack.Screen, { name: 'WebView', component: WebView_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Video', component: Video_1["default"] })));
};
exports["default"] = AppDrawerRoot;