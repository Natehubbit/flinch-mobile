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
require("react-native-gesture-handler");
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var Login_1 = require("../../screens/Login");
var Signup_1 = require("../../screens/Signup");
var Signup2_1 = require("../../screens/Signup2");
var useUser_1 = require("../../hooks/useUser");
var Navbar_1 = require("../../components/Navbar");
var Welcome_1 = require("../../screens/Welcome");
var constants_1 = require("../../common/constants");
var Stack = stack_1.createStackNavigator();
var AuthStack = function () {
    var loggedIn = useUser_1.useUser().loggedIn;
    var allowLogin = !loggedIn;
    var renderHeader = function (props) {
        var name = props.scene.route.name;
        var heading = name === 'Signup2'
            ? 'Create Profile'
            : name;
        var showNav = name === 'Signup2';
        return showNav
            ? react_1["default"].createElement(Navbar_1["default"], { hideBell: true, hideMenu: true, title: heading })
            : null;
    };
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: __assign({ header: function (props) { return renderHeader(props); } }, constants_1.SLIDE_ANIMATION) },
        react_1["default"].createElement(Stack.Screen, { name: 'Welcome', component: Welcome_1["default"] }),
        allowLogin && react_1["default"].createElement(Stack.Screen, { name: 'Login', component: Login_1["default"] }),
        allowLogin && react_1["default"].createElement(Stack.Screen, { name: 'Signup', component: Signup_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Signup2', component: Signup2_1["default"] })));
};
exports["default"] = AuthStack;
