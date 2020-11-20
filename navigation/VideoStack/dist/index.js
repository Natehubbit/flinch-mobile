"use strict";
exports.__esModule = true;
require("react-native-gesture-handler");
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var Navbar_1 = require("../../components/Navbar");
var Videos_1 = require("../../screens/Videos");
var Stack = stack_1.createStackNavigator();
var VideoStack = function () {
    var renderHeader = function (props) {
        var name = props.scene.route.name;
        return react_1["default"].createElement(Navbar_1["default"], { title: name });
    };
    return (react_1["default"].createElement(Stack.Navigator, { screenOptions: {
            header: function (props) { return renderHeader(props); }
        } },
        react_1["default"].createElement(Stack.Screen, { name: 'Videos', component: Videos_1["default"] })));
};
exports["default"] = VideoStack;
