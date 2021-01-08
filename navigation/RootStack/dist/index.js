"use strict";
exports.__esModule = true;
var react_1 = require("react");
var stack_1 = require("@react-navigation/stack");
var AppDrawer_1 = require("../AppDrawer");
var expo_av_1 = require("expo-av");
var Notifications_1 = require("../../screens/Notifications");
var Search_1 = require("../../screens/Search");
var WebView_1 = require("../../screens/WebView");
var react_redux_1 = require("react-redux");
var notifications_1 = require("../../store/notifications");
var Stack = stack_1.createStackNavigator();
var RootStack = function () {
    var dispatch = react_redux_1.useDispatch();
    react_1.useEffect(function () {
        dispatch(notifications_1.notificationsActions.getDeviceToken());
    }, []);
    return (react_1["default"].createElement(Stack.Navigator, { mode: 'modal', headerMode: 'none' },
        react_1["default"].createElement(Stack.Screen, { name: "Home", component: AppDrawer_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'WebView', component: WebView_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: "Video", component: expo_av_1.Video }),
        react_1["default"].createElement(Stack.Screen, { name: "Notifications", component: Notifications_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'Search', component: Search_1["default"] })));
};
exports["default"] = RootStack;
