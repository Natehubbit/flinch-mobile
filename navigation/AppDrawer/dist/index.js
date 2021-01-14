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
var VideoStack_1 = require("../VideoStack");
var Notifications_1 = require("../../screens/Notifications");
var ProfileStack_1 = require("../ProfileStack");
var useUser_1 = require("../../hooks/useUser");
var CelebHome_1 = require("../../screens/CelebHome");
var Drawer = drawer_1.createDrawerNavigator();
var AppDrawer = function () {
    var role = useUser_1.useUser().role;
    var Home = role === 'celebrity' ? CelebHome_1["default"] : HomeStack_1["default"];
    return (react_1["default"].createElement(Drawer.Navigator, { drawerContent: function (props) { return (react_1["default"].createElement(Drawer_1["default"], __assign({}, props))); }, initialRouteName: "Home", screenOptions: {
            header: function () { return null; }
        } },
        react_1["default"].createElement(Drawer.Screen, { name: "Home", component: Home }),
        react_1["default"].createElement(Drawer.Screen, { name: "Profile", component: ProfileStack_1["default"] }),
        react_1["default"].createElement(Drawer.Screen, { name: "Notifications", component: Notifications_1["default"] }),
        react_1["default"].createElement(Drawer.Screen, { name: "Requests", component: RequestStack_1["default"] }),
        react_1["default"].createElement(Drawer.Screen, { name: "Videos", component: VideoStack_1["default"] })));
};
exports["default"] = AppDrawer;
