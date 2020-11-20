"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var useUser_1 = require("../../hooks/useUser");
var LabelTag_1 = require("../LabelTag");
var vector_icons_1 = require("@expo/vector-icons");
var theme_1 = require("../../config/theme");
function VideoCardMini() {
    var uri = useUser_1.useUser().imageUrl;
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: [styles.content] },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: [styles.img] }),
                react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
                    react_1["default"].createElement(react_native_1.Text, { style: [styles.name] }, "James"),
                    react_1["default"].createElement(LabelTag_1["default"], null),
                    react_1["default"].createElement(react_native_1.Text, { style: [styles.date] }, "26 Dec 2020"),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.star] },
                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'star-outline', size: 10, color: theme_1.COLORS.grey }),
                        react_1["default"].createElement(react_native_1.Text, { style: [styles.celeb] }, "Akuffo Addo")))))));
}
exports["default"] = VideoCardMini;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 12,
        alignItems: 'center',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 22
    },
    img: {
        height: 72,
        width: 72,
        borderRadius: 15
    },
    info: {
        marginLeft: 23,
        justifyContent: 'space-between'
    },
    content: {
        flex: 1,
        flexDirection: 'row'
    },
    name: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15
    },
    date: {
        fontSize: 10,
        color: theme_1.COLORS.grey
    },
    celeb: {
        fontSize: 10,
        color: theme_1.COLORS.grey,
        marginLeft: 5
    },
    star: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});
