"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var Tag_1 = require("../Tag");
var theme_1 = require("../../config/theme");
var RequestCard = function (_a) {
    var celeb = _a.celeb, tag = _a.tag, occasion = _a.occasion, uri = _a.imageUrl, price = _a.price, recipient = _a.recipient, date = _a.date, onPress = _a.onPress;
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onPress },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.View, { style: styles.top },
                    react_1["default"].createElement(react_native_1.View, { style: styles.user },
                        react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: styles.image }),
                        react_1["default"].createElement(react_native_1.View, { style: styles.label },
                            react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, celeb),
                            react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: [styles.bottomLabel, styles.mini] },
                                "for ",
                                recipient),
                            react_1["default"].createElement(styledComponents_1.Paragraph, { black: true, style: [styles.bottomLabel, styles.mini] }, date))),
                    react_1["default"].createElement(react_native_1.View, { style: styles.tagContainer },
                        react_1["default"].createElement(Tag_1["default"], { label: tag }))),
                react_1["default"].createElement(react_native_paper_1.Divider, null),
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomLabel },
                            "Occasion:",
                            react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomText },
                                '\t',
                                occasion))),
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomText }, price))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: 100,
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 13,
        backgroundColor: '#fff',
        elevation: 2,
        overflow: 'hidden'
    },
    top: {
        height: '60%',
        paddingHorizontal: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row'
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 100
    },
    user: {
        flexDirection: 'row'
    },
    label: {
        marginLeft: 13,
        justifyContent: 'center'
    },
    tagContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        height: '40%',
        paddingHorizontal: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    bottomLabel: {
        color: 'rgba(0,0,0,0.5)'
    },
    occasion: {
        color: theme_1.theme.colors.primary
    },
    bottomText: {
        color: '#000'
        // fontWeight:'bold'
    },
    mini: {
        fontSize: 12
    }
});
exports["default"] = RequestCard;
