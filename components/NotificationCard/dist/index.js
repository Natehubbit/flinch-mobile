"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var useUser_1 = require("../../hooks/useUser");
var notifications_1 = require("../../store/notifications");
var NotificationCard = function (_a) {
    var read = _a.read, msg = _a.msg, id = _a.id, data = _a.data, time = _a.time, type = _a.type;
    var dispatch = react_redux_1.useDispatch();
    var imageUrl = useUser_1.useUser().imageUrl;
    var navigate = native_1.useNavigation().navigate;
    var opacity = read ? 0.4 : 1;
    var onPress = function () {
        id && dispatch(notifications_1.notificationsActions
            .update(id, { read: true }));
        navigate('Request', { data: data });
    };
    return (react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onPress, style: [styles.container, { opacity: opacity }] },
        react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.Image, { source: { uri: imageUrl }, style: [styles.img] })),
            react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, numberOfLines: 2, style: [styles.msg] }, msg),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: [styles.time] }, time)))));
};
exports["default"] = NotificationCard;
var styles = react_native_1.StyleSheet.create({
    container: {
        height: 90,
        borderLeftColor: theme_1.COLORS.success,
        borderLeftWidth: 3,
        borderBottomWidth: 1,
        borderBottomColor: theme_1.COLORS.border,
        backgroundColor: theme_1.COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 17,
        flexDirection: 'row'
    },
    img: {
        height: 46,
        width: 46,
        borderRadius: 100
    },
    content: {
        marginLeft: 15,
        paddingRight: 55
    },
    time: {
        fontSize: 12,
        opacity: 0.5,
        marginTop: 5
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 55
    },
    msg: {
        fontSize: 13
    },
    name: {
        fontWeight: 'bold'
    }
});
