"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var vector_icons_1 = require("@expo/vector-icons");
var Navbar = function (props) {
    var title = props.title, isHome = props.isHome, hideMenu = props.hideMenu, hideBell = props.hideBell;
    var _a = native_1.useNavigation(), navigate = _a.navigate, canGoBack = _a.canGoBack, dispatch = _a.dispatch, goBack = _a.goBack;
    var backable = canGoBack();
    var onToggleDrawer = function () { return dispatch(native_1.DrawerActions.toggleDrawer()); };
    var onSearch = function () { return navigate('Search'); };
    var renderIcon = function (icon, badge) { return (react_1["default"].createElement(react_native_1.View, { style: styles.iconContainer },
        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: icon, style: styles.icon, size: 24 }),
        badge && react_1["default"].createElement(react_native_paper_1.Badge, { size: 9, style: styles.badge, visible: true }))); };
    return react_1["default"].createElement(react_native_paper_1.Appbar, { theme: { colors: { primary: 'white' } }, style: styles.container },
        backable
            ? react_1["default"].createElement(react_native_paper_1.Appbar.BackAction, { onPress: goBack })
            : !hideMenu && react_1["default"].createElement(react_native_paper_1.Appbar.Action, { onPress: onToggleDrawer, icon: 'menu' }),
        react_1["default"].createElement(react_native_paper_1.Appbar.Content, { title: title, titleStyle: styles.title }),
        isHome && react_1["default"].createElement(react_native_paper_1.Appbar.Action, { icon: function () { return renderIcon('magnify'); }, onPress: onSearch, animated: false }),
        !hideBell && react_1["default"].createElement(react_native_paper_1.Appbar.Action, { animated: false, icon: function () { return renderIcon('bell-outline', true); } }));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        elevation: 0,
        height: 50
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'SuezOne-Regular'
    },
    iconContainer: {},
    icon: {
        opacity: 0.5
    },
    badge: {
        position: 'absolute',
        right: 2,
        top: 2,
        backgroundColor: '#3ACC6C'
    }
});
exports["default"] = react_native_paper_1.withTheme(Navbar);
