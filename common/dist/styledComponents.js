"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.AltMiniLabel = exports.MiniLabel = exports.AltMainLabel = exports.MainLabel = exports.SubHeading = exports.MainTitle = exports.FlexContainer = exports.FormContainer = exports.Paragraph = exports.AppContainer = exports.AuthContainer2 = exports.AuthContainer = exports.maxHeight = exports.maxWidth = void 0;
var native_1 = require("styled-components/native");
var theme_1 = require("../config/theme");
var react_native_1 = require("react-native");
exports.maxWidth = react_native_1.Dimensions.get('window').width;
exports.maxHeight = react_native_1.Dimensions.get('window').height;
exports.AuthContainer = native_1["default"].ScrollView(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    padding-left: 45px;\n    padding-right: 45px;\n    background-color: rgba(0,0,0,0.5);\n    flex:1;\n"], ["\n    padding-left: 45px;\n    padding-right: 45px;\n    background-color: rgba(0,0,0,0.5);\n    flex:1;\n"])));
exports.AuthContainer2 = native_1["default"].View(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    padding-left: 45px;\n    padding-right: 45px;\n    background-color: white;\n    flex:1;\n"], ["\n    padding-left: 45px;\n    padding-right: 45px;\n    background-color: white;\n    flex:1;\n"])));
exports.AppContainer = native_1["default"].FlatList(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    padding-top: 12px;\n    height:100%;\n"], ["\n    padding-top: 12px;\n    height:100%;\n"])));
exports.Paragraph = native_1["default"].Text(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    color:", ";\n    font-weight:", ";\n    font-family: 'Karla-Regular';\n"], ["\n    color:",
    ";\n    font-weight:", ";\n    font-family: 'Karla-Regular';\n"])), function (_a) {
    var black = _a.black, link = _a.link, light = _a.light;
    return black
        ? '#000'
        : link
            ? theme_1.theme.colors.primary
            : light
                ? 'rgba(0,0,0,0.5)'
                : '#fff';
}, function (_a) {
    var link = _a.link;
    return link ? 'bold' : 'normal';
});
exports.FormContainer = native_1["default"].View(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    height:", "px\n"], ["\n    height:", "px\n"])), exports.maxHeight - 24);
exports.FlexContainer = native_1["default"].View(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    flex:", ";\n    background:", ";\n    justify-content:", ";\n    flex-direction:", ";\n    align-items:", "\n"], ["\n    flex:", ";\n    background:", ";\n    justify-content:", ";\n    flex-direction:", ";\n    align-items:", "\n"])), function (props) { return props.flex || 1; }, function (props) { return props.color || 'transparent'; }, function (props) { return props.justify || 'flex-start'; }, function (props) { return props.direction || 'column'; }, function (props) { return props.align || 'stretch'; });
exports.MainTitle = native_1["default"].Text(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    font-size: 25px;\n    color: ", ";\n    font-family: 'SuezOne-Regular';\n"], ["\n    font-size: 25px;\n    color: ", ";\n    font-family: 'SuezOne-Regular';\n"])), theme_1.theme.colors.accent);
exports.SubHeading = native_1["default"].Text(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    font-size: 15px;\n    font-family: 'MontserratAlternates-Bold'\n"], ["\n    font-size: 15px;\n    font-family: 'MontserratAlternates-Bold'\n"])));
exports.MainLabel = native_1["default"].Text(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    font-size:25px;\n    line-height: 33px;\n    font-family: 'SuezOne-Regular'\n"], ["\n    font-size:25px;\n    line-height: 33px;\n    font-family: 'SuezOne-Regular'\n"])));
exports.AltMainLabel = native_1["default"].Text(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    font-size:25px;\n    line-height: 33px;\n    font-weight: bold;\n    font-family: 'Rubik-Regular'\n"], ["\n    font-size:25px;\n    line-height: 33px;\n    font-weight: bold;\n    font-family: 'Rubik-Regular'\n"])));
exports.MiniLabel = native_1["default"].Text(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    font-size:16px;\n    line-height: 19px;\n    font-family: 'Karla-Regular';\n    color: #746F6F;\n"], ["\n    font-size:16px;\n    line-height: 19px;\n    font-family: 'Karla-Regular';\n    color: #746F6F;\n"])));
exports.AltMiniLabel = native_1["default"].Text(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    font-size:15px;\n    font-weight: bold;\n    font-family: 'Rubik-SemiBold'\n"], ["\n    font-size:15px;\n    font-weight: bold;\n    font-family: 'Rubik-SemiBold'\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12;
