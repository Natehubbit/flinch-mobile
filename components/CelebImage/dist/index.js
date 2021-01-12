"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var theme_1 = require("../../config/theme");
var native_1 = require("@react-navigation/native");
var HelperService_1 = require("../../services/HelperService");
var CelebImage = function (_a) {
    var large = _a.large, props = __rest(_a, ["large"]);
    var alias = props.alias, price = props.price, craft = props.craft, imageUrl = props.imageUrl, id = props.id, token = props.token;
    var size = large ? { width: '47%' } : null;
    var navigate = native_1.useNavigation().navigate;
    var onPressed = function () { return navigate('Celeb', {
        data: {
            id: id,
            alias: alias,
            craft: craft,
            imageUrl: imageUrl,
            token: token || '',
            price: price
        }
    }); };
    return react_1["default"].createElement(react_native_paper_1.Card, { theme: { roundness: 10 }, onPress: onPressed, style: [styles.container, size] },
        react_1["default"].createElement(react_native_paper_1.Card.Cover, { style: [styles.cover], theme: { roundness: 10 }, source: {
                uri: imageUrl
            } }),
        react_1["default"].createElement(expo_linear_gradient_1.LinearGradient, { colors: ['transparent', 'rgba(0,0,0,0.6)'], style: styles.overlay },
            react_1["default"].createElement(react_native_1.View, { style: styles.textContainer },
                react_1["default"].createElement(react_native_1.View, { style: styles.dets },
                    react_1["default"].createElement(react_native_1.Text, { numberOfLines: 1, style: styles.celebName }, alias),
                    react_1["default"].createElement(react_native_1.Text, { style: styles.role }, craft)),
                react_1["default"].createElement(react_native_1.Text, { style: styles.price }, HelperService_1["default"].parseToMoney(price)))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: styledComponents_1.maxWidth * 0.35,
        marginRight: 10,
        height: styledComponents_1.maxHeight * 0.20,
        marginBottom: 20
    },
    cover: {
        height: styledComponents_1.maxHeight * 0.20,
        borderRadius: 10
    },
    overlay: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        borderRadius: 10,
        justifyContent: 'flex-end',
        padding: 5
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    celebName: {
        color: 'white',
        fontFamily: 'Rubik-SemiBold',
        fontSize: 12
    },
    role: {
        color: 'white',
        fontFamily: 'Karla-Regular',
        fontSize: 11
    },
    price: {
        fontSize: 11,
        fontWeight: 'bold',
        color: theme_1.theme.colors.primary
    },
    dets: {
        width: '75%',
        paddingRight: 5
    }
});
exports["default"] = CelebImage;
