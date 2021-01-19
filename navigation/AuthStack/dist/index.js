"use strict";
exports.__esModule = true;
require("react-native-gesture-handler");
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var Login_1 = require("../../screens/Login");
var Signup_1 = require("../../screens/Signup");
var Signup2_1 = require("../../screens/Signup2");
var Welcome_1 = require("../../screens/Welcome");
var Stack = stack_1.createStackNavigator();
var AuthStack = function () {
    return (react_1["default"].createElement(Stack.Navigator, { headerMode: 'none' },
        react_1["default"].createElement(Stack.Screen, { name: "Welcome", component: Welcome_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Login", component: Login_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Signup", component: Signup_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Signup2", component: Signup2_1["default"] })));
};
exports["default"] = AuthStack;
