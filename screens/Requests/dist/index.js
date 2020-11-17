"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var RequestCard_1 = require("../../components/RequestCard");
var Requests = function () {
    var navigate = native_1.useNavigation().navigate;
    var onOpenRequest = function () { return navigate('Request'); };
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(RequestCard_1["default"], { name: 'Judas Ainsely', occasion: 'Birthday', price: 'GHs50.00', tag: 'success', onPress: onOpenRequest })));
};
exports["default"] = Requests;
