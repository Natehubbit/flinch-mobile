"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../common/constants");
var styledComponents_1 = require("../../common/styledComponents");
var Input_1 = require("../../components/Input");
var useUser_1 = require("../../hooks/useUser");
var react_native_paper_1 = require("react-native-paper");
var theme_1 = require("../../config/theme");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Button_1 = require("../../components/Button");
var bck = require('../../assets/images/profileBck.png');
var Profile = function () {
    var _a = react_1.useState(false), editting = _a[0], setEditting = _a[1];
    var _b = react_native_1.useWindowDimensions(), height = _b.height, width = _b.width;
    var _c = useUser_1.useUser(), imageUrl = _c.imageUrl, name = _c.displayName, email = _c.email;
    var imgHeight = height * 0.2;
    var onEditting = function () {
        setEditting(true);
    };
    var onSave = function () {
    };
    var onCancel = function () {
        setEditting(false);
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
        react_1["default"].createElement(react_native_1.ScrollView, null,
            react_1["default"].createElement(react_native_1.View, { style: [
                    { width: width, height: imgHeight }
                ] },
                react_1["default"].createElement(react_native_1.ImageBackground, { style: { flex: 1 }, source: bck }),
                !editting
                    ? react_1["default"].createElement(react_native_paper_1.IconButton, { icon: 'account-edit', color: theme_1.COLORS.white, style: [styles.editIcon], onPress: onEditting })
                    : react_1["default"].createElement(react_native_paper_1.IconButton, { icon: 'close', onPress: onCancel, color: theme_1.COLORS.dark, style: [styles.editIcon] })),
            react_1["default"].createElement(react_native_1.View, { style: [styles.imgContainer] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.dp] },
                    react_1["default"].createElement(react_1["default"].Fragment, null,
                        react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { onPress: function () { return console.log('heo'); } },
                            react_1["default"].createElement(react_native_1.Image, { source: { uri: imageUrl }, style: [styles.img] }))))),
            react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.profileInfo] },
                    react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, name),
                    react_1["default"].createElement(styledComponents_1.Paragraph, { light: true }, email)),
                react_1["default"].createElement(react_native_1.View, { style: [styles.form] }, constants_1.PROFILE_FORM.map(function (d, i) { return (react_1["default"].createElement(Input_1["default"], { key: i, placeholder: d.placeholder, left: d.left, right: d.right, disabled: !editting })); })))),
        editting && react_1["default"].createElement(react_native_1.View, { style: [styles.actions] },
            react_1["default"].createElement(Button_1["default"], { label: 'Save', onPress: onSave }))));
};
exports["default"] = Profile;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    imgContainer: {
        height: 25,
        width: 107,
        alignSelf: 'center'
    },
    dp: {
        height: 107,
        width: 107,
        borderRadius: 100,
        position: 'absolute',
        bottom: 5,
        alignSelf: 'center',
        zIndex: 10
    },
    content: {},
    profileInfo: {
        alignItems: 'center'
    },
    form: {
        paddingHorizontal: 40,
        paddingVertical: 15
    },
    editIcon: {
        position: 'absolute',
        right: 2,
        top: 2,
        zIndex: 10,
        padding: 5,
        elevation: 0
    },
    img: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    actions: {
        padding: 10,
        elevation: 10,
        backgroundColor: theme_1.COLORS.white,
        alignItems: 'center'
    }
});
