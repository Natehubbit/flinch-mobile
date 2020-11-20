"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var Tag_1 = require("../Tag");
var RequestCard = function (_a) {
    var name = _a.name, tag = _a.tag, occasion = _a.occasion, uri = _a.imageUrl, price = _a.price, onPress = _a.onPress;
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: onPress },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(react_native_1.View, { style: styles.top },
                    react_1["default"].createElement(react_native_1.View, { style: styles.user },
                        react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: styles.image }),
                        react_1["default"].createElement(react_native_1.View, { style: styles.label },
                            react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, name))),
                    react_1["default"].createElement(react_native_1.View, { style: styles.tagContainer },
                        react_1["default"].createElement(Tag_1["default"], { label: tag }))),
                react_1["default"].createElement(react_native_paper_1.Divider, null),
                react_1["default"].createElement(react_native_1.View, { style: styles.bottom },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomLabel },
                            "Occasion:",
                            react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomText }, occasion))),
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(styledComponents_1.Paragraph, { style: styles.bottomText }, price))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        height: 76,
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
        height: 30,
        width: 30,
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
    bottomText: {
        color: '#000'
        // fontWeight:'bold'
    }
});
exports["default"] = RequestCard;