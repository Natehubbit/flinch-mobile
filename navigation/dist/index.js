"use strict";
exports.__esModule = true;
require("react-native-gesture-handler");
var react_1 = require("react");
var native_1 = require("@react-navigation/native");
var AuthStack_1 = require("./AuthStack");
var AppDrawer_1 = require("./AppDrawer");
var useUser_1 = require("../hooks/useUser");
var NavigationService_1 = require("../services/NavigationService");
var Navigation = function () {
    var profileUpdated = useUser_1.useUser().profileUpdated;
    return react_1["default"].createElement(native_1.NavigationContainer, { ref: function (ref) { return NavigationService_1["default"].setRef(ref); } }, profileUpdated
        ? react_1["default"].createElement(AppDrawer_1["default"], null)
        : react_1["default"].createElement(AuthStack_1["default"], null));
};
exports["default"] = Navigation;
