"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var vector_icons_1 = require("@expo/vector-icons");
var img = require('../../assets/images/loginBack.jpg');
var VideoCard = function () {
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(react_native_1.ImageBackground, { source: img, style: [styles.img] }),
        react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
            react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'play', style: [styles.fab], small: true }),
            react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
                react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, "Shatta Wale"),
                react_1["default"].createElement(react_native_1.View, { style: [styles.labelContainer] },
                    react_1["default"].createElement(react_native_1.View, { style: [styles.label] },
                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'account-outline', style: [styles.icon] }),
                        react_1["default"].createElement(react_native_paper_1.Paragraph, { numberOfLines: 1 }, "James Madisson")),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.label] },
                        react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'calendar-outline', style: [styles.icon] }),
                        react_1["default"].createElement(react_native_paper_1.Paragraph, { numberOfLines: 1 }, "James Madisson")))))));
};
exports["default"] = VideoCard;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        height: styledComponents_1.maxHeight * 0.45,
        backgroundColor: theme_1.COLORS.white,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    img: {
        width: '100%',
        flex: 2
    },
    content: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        right: 15,
        top: -20
    },
    info: {
        paddingRight: 75,
        paddingLeft: 15,
        paddingVertical: 10,
        justifyContent: 'center',
        flex: 1
    },
    icon: {
        marginRight: 2,
        fontSize: 15
    },
    labelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        opacity: 0.6
    }
});
