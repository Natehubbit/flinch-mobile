"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var styledComponents_1 = require("../../common/styledComponents");
var theme_1 = require("../../config/theme");
var selector_1 = require("../../hooks/selector");
var selector_2 = require("../../store/selector");
var Selector = function (_a) {
    var onHide = _a.onHide;
    var dispatch = react_redux_1.useDispatch();
    var _b = selector_1.useSelect(), show = _b.show, value = _b.value, 
    // onSelect,
    options = _b.options, title = _b.title;
    var onPress = function (val) {
        dispatch(selector_2.selectorActions.setSelector({ value: val }));
    };
    var close = function () {
        dispatch(selector_2.selectorActions.setSelector({ show: false }));
    };
    var checked = function (option) {
        return value === option ? 'checked' : 'unchecked';
    };
    var onOkay = function () {
        close();
    };
    var onCancel = function () {
        dispatch(selector_2.selectorActions.resetSelector());
    };
    return show && (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(styledComponents_1.SubHeading, null, title),
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: [styles.scroll] }, options.map(function (option, i) {
            return react_1["default"].createElement(react_native_paper_1.TouchableRipple, { onPress: function () { return onPress(option); }, key: i, style: [styles.option] },
                react_1["default"].createElement(react_1["default"].Fragment, null,
                    react_1["default"].createElement(react_native_paper_1.RadioButton, { color: theme_1.theme.colors.primary, key: i, value: option, status: checked(option), onPress: function () { return onPress(option); } }),
                    react_1["default"].createElement(styledComponents_1.MiniLabel, null, option)));
        })),
        react_1["default"].createElement(react_native_1.View, { style: [styles.btns] },
            react_1["default"].createElement(react_native_paper_1.Button, { color: theme_1.theme.colors.primary, uppercase: false, onPress: onOkay }, "Okay"),
            react_1["default"].createElement(react_native_paper_1.Button, { color: theme_1.COLORS.red, uppercase: false, onPress: onCancel }, "Cancel"))));
};
exports["default"] = Selector;
var styles = react_native_1.StyleSheet.create({
    container: {
        height: '80%',
        width: '80%',
        backgroundColor: theme_1.COLORS.white,
        borderRadius: 4,
        padding: 17
    },
    option: {
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    scroll: {
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 10
    },
    btns: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 40
    }
});
