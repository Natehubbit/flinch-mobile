"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var useUser_1 = require("../../hooks/useUser");
var NotificationCard = function (_a) {
    var viewed = _a.viewed, type = _a.type;
    var imageUrl = useUser_1.useUser().imageUrl;
    var opacity = viewed ? 0.4 : 1;
    return (react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: function () { return console.log('d'); }, style: [styles.container, { opacity: opacity }] },
        react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.Image, { source: { uri: imageUrl }, style: [styles.img] })),
            react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, numberOfLines: 2, style: [styles.msg] },
                    react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: [styles.name] },
                        "Shatta Wale",
                        '\t'),
                    "has met your Request you are ama who will not enter my heart to destroy shit"),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: [styles.time] }, "20 minutes ago")))));
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
        fontSize: 12
    },
    name: {
        fontWeight: 'bold'
    }
});
