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
var react_1 = require("react");
var drawer_1 = require("@react-navigation/drawer");
var react_redux_1 = require("react-redux");
var useUser_1 = require("../../hooks/useUser");
var user_1 = require("../../store/user");
var vector_icons_1 = require("@expo/vector-icons");
var theme_1 = require("../../config/theme");
var react_native_1 = require("react-native");
var styledComponents_1 = require("../../common/styledComponents");
var react_native_paper_1 = require("react-native-paper");
var Drawer = function (props) {
    var dispatch = react_redux_1.useDispatch();
    var user = useUser_1.useUser();
    var routeNames = props.state.routeNames, navigation = props.navigation;
    var navigate = navigation.navigate, reset = navigation.reset;
    var onNavigate = function (route) { return navigate(route); };
    var _a = react_1.useState(user.role === 'celebrity'), toggle = _a[0], setToggle = _a[1];
    var onToggleSwitch = function (val) {
        setToggle(val);
        dispatch(user_1.userActions.updateProfile(__assign(__assign({}, user), { role: val
                ? 'celebrity'
                : 'user' })));
        reset({
            index: 0,
            routes: [{ name: 'Home', key: null }]
        });
    };
    var onLogout = function () {
        dispatch(user_1.userActions.signout());
    };
    var renderRoutes = function () {
        return routeNames.map(function (route, i) {
            var isHome = route === 'Home';
            var label = route === 'Videos'
                ? 'My Videos'
                : route;
            var icon = isHome
                ? 'home-outline'
                : route === 'Requests'
                    ? 'book-outline'
                    : route === 'Notifications'
                        ? 'bell-outline'
                        : route === 'Videos'
                            ? 'video-outline'
                            : route === 'Profile'
                                ? 'account-outline'
                                : 'camera';
            return react_1["default"].createElement(drawer_1.DrawerItem, { key: i, icon: function (props) { return react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, __assign({}, props, { name: icon, style: styles.drawerIcon })); }, label: label, onPress: function () { return onNavigate(route); }, activeBackgroundColor: '#fff', labelStyle: styles.drawerLabel, style: styles.drawerItem });
        });
    };
    var imageUrl = user.imageUrl, role = user.role, displayName = user.displayName;
    return react_1["default"].createElement(react_native_1.View, { style: styles.drawer },
        react_1["default"].createElement(react_native_1.View, { style: styles.head },
            react_1["default"].createElement(react_native_1.View, { style: styles.user },
                react_1["default"].createElement(react_native_1.Image, { source: { uri: imageUrl }, style: styles.avatar }),
                react_1["default"].createElement(react_native_1.View, { style: styles.userLabel },
                    react_1["default"].createElement(styledComponents_1.SubHeading, { style: styles.name }, displayName),
                    react_1["default"].createElement(styledComponents_1.MiniLabel, { style: styles.role }, role || 'user'))),
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_paper_1.Switch, { theme: { colors: { accent: 'white' } }, value: toggle, onValueChange: function (val) { return onToggleSwitch(val); } }))),
        renderRoutes(),
        react_1["default"].createElement(react_native_1.View, { style: [styles.bottom] },
            react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onLogout, style: [styles.logout] },
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(styledComponents_1.Paragraph, null, "Logout"),
                    react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'logout', size: 20, color: theme_1.COLORS.white })))));
};
var styles = react_native_1.StyleSheet.create({
    drawer: {
        height: '100%',
        backgroundColor: theme_1.theme.colors.primary
    },
    drawerLabel: {
        color: '#fff'
    },
    drawerItem: {
        // height:35,
        justifyContent: 'center'
    },
    drawerIcon: {
        color: '#fff'
    },
    head: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 12,
        marginBottom: 25
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    user: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userLabel: {
        marginHorizontal: 15,
        justifyContent: 'space-around'
    },
    name: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17
    },
    role: {
        fontSize: 12,
        lineHeight: 10,
        color: '#fff'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        height: 50,
        justifyContent: 'center',
        width: '100%'
    },
    logout: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12
    }
});
exports["default"] = Drawer;
