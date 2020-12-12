"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var vector_icons_1 = require("@expo/vector-icons");
var theme_1 = require("../../config/theme");
var menu_svg_1 = require("../../assets/images/menu.svg");
var menuWhite_svg_1 = require("../../assets/images/menuWhite.svg");
var Navbar = function (_a) {
    var title = _a.title, isHome = _a.isHome, hideMenu = _a.hideMenu, hideBell = _a.hideBell, edit = _a.edit, showCancel = _a.showCancel, invert = _a.invert, onCancel = _a.onCancel, onEdit = _a.onEdit;
    var _b = native_1.useNavigation(), navigate = _b.navigate, canGoBack = _b.canGoBack, dispatch = _b.dispatch, goBack = _b.goBack;
    var iconColor = invert
        ? theme_1.COLORS.white
        : theme_1.COLORS.iconGrey;
    var barStyle = invert
        ? { backgroundColor: theme_1.theme.colors.primary, elevation: 0 }
        : null;
    var backable = canGoBack();
    var onToggleDrawer = function () {
        return dispatch(native_1.DrawerActions.toggleDrawer());
    };
    var onSearch = function () {
        return navigate('Search');
    };
    var renderIcon = function (icon, badge) { return (react_1["default"].createElement(react_native_1.View, { style: styles.iconContainer },
        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { color: iconColor, name: icon, style: [styles.icon], size: 24 }),
        badge && react_1["default"].createElement(react_native_paper_1.Badge, { size: 9, style: styles.badge, visible: true }))); };
    var openNotifs = function () {
        return navigate('Notifications');
    };
    return react_1["default"].createElement(react_native_paper_1.Appbar, { theme: { colors: { primary: theme_1.COLORS.white } }, style: [styles.container, barStyle && barStyle] },
        backable
            ? react_1["default"].createElement(react_native_paper_1.Appbar.BackAction, { color: iconColor, onPress: goBack })
            : !hideMenu &&
                react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onToggleDrawer }, !invert
                    ? react_1["default"].createElement(menu_svg_1["default"], { width: 35, height: 30 })
                    : react_1["default"].createElement(menuWhite_svg_1["default"], { width: 35, height: 30 })),
        react_1["default"].createElement(react_native_paper_1.Appbar.Content, { title: title, titleStyle: styles.title }),
        isHome && react_1["default"].createElement(react_native_paper_1.Appbar.Action, { icon: function () { return renderIcon('magnify'); }, onPress: onSearch, animated: false, color: iconColor }),
        !hideBell
            ? react_1["default"].createElement(react_native_paper_1.Appbar.Action, { animated: false, icon: function () { return renderIcon('bell-outline', true); }, onPress: openNotifs, color: iconColor })
            : !edit && react_1["default"].createElement(react_native_paper_1.Appbar.Action, { animated: false, icon: function () { return null; }, disabled: true }),
        edit && !showCancel &&
            react_1["default"].createElement(react_native_paper_1.Appbar.Action, { icon: function () { return renderIcon('account-edit'); }, onPress: onEdit, color: iconColor }),
        edit && showCancel &&
            react_1["default"].createElement(react_native_paper_1.Appbar.Action, { icon: function () { return renderIcon('close'); }, onPress: onCancel, color: iconColor }));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        elevation: 1,
        height: 50
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'SuezOne-Regular'
    },
    iconContainer: {},
    icon: {
    // opacity: 0.5
    },
    badge: {
        position: 'absolute',
        right: 2,
        top: 2,
        backgroundColor: '#3ACC6C'
    }
});
exports["default"] = react_native_paper_1.withTheme(Navbar);
