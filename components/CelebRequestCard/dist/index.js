"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var urgent_svg_1 = require("../../assets/images/urgent.svg");
var styledComponents_1 = require("../../common/styledComponents");
var CelebRequestCard = function (_a) {
    var ocassion = _a.ocassion, recipient = _a.recipient, price = _a.price, data = _a.data, time = _a.time;
    var navigate = native_1.useNavigation().navigate;
    var onPress = function () {
        navigate('Request', { id: '', data: data });
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { style: [styles.container], onPress: onPress },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.View, { style: [styles.icon] },
                    react_1["default"].createElement(urgent_svg_1["default"], { height: 40, width: 40 })),
                react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
                    react_1["default"].createElement(styledComponents_1.AltMiniLabel, { style: [styles.event] }, ocassion),
                    react_1["default"].createElement(react_native_paper_1.Paragraph, null, recipient)),
                react_1["default"].createElement(react_native_1.View, { style: [styles.extra] },
                    react_1["default"].createElement(react_native_paper_1.Paragraph, { numberOfLines: 1, style: [styles.time] }, time),
                    react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, price)))),
        react_1["default"].createElement(react_native_paper_1.Divider, null)));
};
exports["default"] = CelebRequestCard;
var styles = react_native_1.StyleSheet.create({
    container: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        height: 70
    },
    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flex: 2
    },
    info: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        flex: 6,
        height: '100%'
    },
    col1: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    extra: {
        alignItems: 'flex-end',
        height: '100%',
        // backgroundColor: 'red',
        flex: 4
    },
    event: {
        fontSize: 15,
        fontWeight: 'normal'
    },
    time: {
        fontSize: 12
    }
});
