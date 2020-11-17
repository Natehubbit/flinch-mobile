"use strict";
exports.__esModule = true;
require("react-native-gesture-handler");
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var Login_1 = require("../../screens/Login");
var Signup_1 = require("../../screens/Signup");
var Signup2_1 = require("../../screens/Signup2");
var useUser_1 = require("../../hooks/useUser");
var Navbar_1 = require("../../components/Navbar");
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
    return (react_1["default"].createElement(Stack.Navigator, { initialRouteName: 'Login', screenOptions: {
            header: function (props) { return renderHeader(props); }
        } },
        allowLogin && react_1["default"].createElement(Stack.Screen, { name: 'Login', component: Login_1["default"] }),
        allowLogin && react_1["default"].createElement(Stack.Screen, { name: 'Signup', component: Signup_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Signup2', component: Signup2_1["default"] })));
};
exports["default"] = AuthStack;
