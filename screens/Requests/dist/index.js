"use strict";
exports.__esModule = true;
// import { useNavigation } from '@react-navigation/native'
var react_1 = require("react");
var react_native_1 = require("react-native");
var RequestCard_1 = require("../../components/RequestCard");
var useUser_1 = require("../../hooks/useUser");
// import { Routes } from '../../navigation'
var Requests = function () {
    // const { navigate } = useNavigation()
    var onOpenRequest = function () { };
    var uri = useUser_1.useUser().imageUrl;
    return (react_1["default"].createElement(react_native_1.View, null,
        react_1["default"].createElement(RequestCard_1["default"], { name: 'Judas Ainsely', occasion: 'Birthday', price: 'GHs50.00', tag: 'success', onPress: onOpenRequest, imageUrl: uri })));
};
exports["default"] = Requests;
