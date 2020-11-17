"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Input_1 = require("../../components/Input");
var card_svg_1 = require("../../assets/images/card.svg");
var styledComponents_1 = require("../../common/styledComponents");
var react_native_paper_1 = require("react-native-paper");
var PaymentCard = function () {
    var _a = react_1.useState(true), see = _a[0], setSee = _a[1];
    var onToggle = function () { return setSee(!see); };
    return react_1["default"].createElement(react_native_1.View, { style: styles.contentContainer },
        react_1["default"].createElement(card_svg_1["default"], { style: styles.image }),
        react_1["default"].createElement(Input_1["default"], { left: 'credit-card', label: 'Card No.' }),
        react_1["default"].createElement(Input_1["default"], { label: 'CCV', secureTextEntry: see, left: 'lock', right: 'eye', onIconClicked: onToggle }),
        react_1["default"].createElement(react_native_paper_1.FAB, { style: styles.fab, icon: 'chevron-right', label: 'Proceed', onPress: function () { return console.log('go'); } }));
};
var styles = react_native_1.StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 39,
        backgroundColor: '#fff',
        height: styledComponents_1.maxHeight - 70
    },
    image: {
        width: styledComponents_1.maxWidth,
        marginVertical: 20,
        alignSelf: 'center'
    },
    fab: {
        position: 'absolute',
        bottom: 25,
        right: 39
    },
    fabContainer: {
        overflow: 'hidden'
    }
});
exports["default"] = PaymentCard;
