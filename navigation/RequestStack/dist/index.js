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
var stack_1 = require("@react-navigation/stack");
var react_1 = require("react");
var constants_1 = require("../../common/constants");
var Navbar_1 = require("../../components/Navbar");
var useUser_1 = require("../../hooks/useUser");
var Request_1 = require("../../screens/Request");
var Requests_1 = require("../../screens/Requests");
var VideoRecord_1 = require("../../screens/VideoRecord");
var VideoUpload_1 = require("../../screens/VideoUpload");
var RequestsTabs_1 = require("../RequestsTabs");
var Stack = stack_1.createStackNavigator();
var RequestStack = function () {
    var role = useUser_1.useUser().role;
    var renderRequests = function () {
        return role === 'celebrity'
            ? RequestsTabs_1["default"]
            : Requests_1["default"];
    };
    var renderHeader = function (props) {
        var name = props.scene.route.name;
        var heading = name === 'VideoUpload'
            ? 'Upload Video'
            : name;
        var show = name === 'RecordVideo';
        return !show ? react_1["default"].createElement(Navbar_1["default"], { title: heading, hideBell: true }) : null;
    };
    return react_1["default"].createElement(Stack.Navigator, { screenOptions: __assign({ header: function (props) { return renderHeader(props); } }, constants_1.SLIDE_ANIMATION) },
        react_1["default"].createElement(Stack.Screen, { name: 'Requests', component: renderRequests() }),
        react_1["default"].createElement(Stack.Screen, { name: 'Request', component: Request_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'VideoUpload', component: VideoUpload_1["default"] }),
        react_1["default"].createElement(Stack.Screen, { name: 'RecordVideo', component: VideoRecord_1["default"] }));
};
exports["default"] = RequestStack;
