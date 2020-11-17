"use strict";
exports.__esModule = true;
// import liraries
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var vector_icons_1 = require("@expo/vector-icons");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var ButtonAction = function (props) {
    var label = props.label, icon = props.icon, onPress = props.onPress;
    var primary = theme_1.theme.colors.primary;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: styles.touch, onPress: onPress },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: icon, color: primary, size: 35 }),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, label)))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        minHeight: 105,
        minWidth: 131,
        justifyContent: 'center',
        backgroundColor: '#F6FCFF',
        borderRadius: 20,
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 2
    },
    touch: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {}
});
// make this component available to the app
exports["default"] = ButtonAction;
