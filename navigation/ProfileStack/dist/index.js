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
var Profile_1 = require("../../screens/Profile");
var constants_1 = require("../../common/constants");
var Stack = stack_1.createStackNavigator();
var ProfileStack = function () {
    // const renderHeader = (props:StackHeaderProps) => {
    //   const { scene: { route: { name } } } = props
    //   return <Navbar title={name} hideBell/>
    // }
    return (react_1["default"].createElement(Stack.Navigator, { headerMode: 'none', screenOptions: __assign({}, constants_1.SLIDE_ANIMATION) },
        react_1["default"].createElement(Stack.Screen, { name: 'Profile', component: Profile_1["default"] })));
};
exports["default"] = ProfileStack;
