"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var welcome_svg_1 = require("../../assets/images/welcome.svg");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var Welcome = function () {
    var height = react_native_1.useWindowDimensions().height;
    var navigate = native_1.useNavigation().navigate;
    var bckHeight = height * 0.4;
    var onLogin = function () { return navigate('Login'); };
    var onSignup = function () { return navigate('Signup'); };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: [styles.container] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.top] },
                react_1["default"].createElement(welcome_svg_1["default"], { height: bckHeight })),
            react_1["default"].createElement(react_native_1.View, { style: [styles.bottom] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
                    react_1["default"].createElement(styledComponents_1.MainLabel, { white: true }, "Get Started"),
                    react_1["default"].createElement(styledComponents_1.Paragraph, null,
                        '\n',
                        "Please login or signup and get connected to the world class talents",
                        '\n\n')),
                react_1["default"].createElement(react_native_paper_1.Button, { mode: 'contained', uppercase: false, style: [styles.btn], onPress: onSignup, theme: { colors: { primary: theme_1.COLORS.white } } }, "Signup"),
                react_1["default"].createElement(react_native_paper_1.Button, { mode: 'contained', uppercase: false, style: [styles.loginBtn, styles.btn], labelStyle: { color: theme_1.COLORS.white }, onPress: onLogin, theme: { colors: { primary: theme_1.COLORS.white } } }, "Login")))));
};
exports["default"] = Welcome;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme_1.COLORS.white
    },
    top: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flex: 1,
        backgroundColor: theme_1.theme.colors.primary,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingHorizontal: 50,
        elevation: 100
    },
    btn: {
        marginBottom: 25
    },
    loginBtn: {
        borderWidth: 1.5,
        borderColor: theme_1.COLORS.white,
        backgroundColor: theme_1.theme.colors.primary
    },
    info: {
        marginTop: 30
    }
});
