"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
var Avatar_1 = require("../../components/Avatar");
var Input_1 = require("../../components/Input");
var react_redux_1 = require("react-redux");
var user_1 = require("../../store/user");
var useLoader_1 = require("../../hooks/useLoader");
var HelperService_1 = require("../../services/HelperService");
var native_1 = require("@react-navigation/native");
var Signup2 = function () {
    var dispatch = react_redux_1.useDispatch();
    var authLoader = useLoader_1.useLoader().authLoader.isLoading;
    var _a = react_1.useState(''), name = _a[0], setName = _a[1];
    var _b = react_1.useState(''), imgUri = _b[0], setImgUri = _b[1];
    var enableSubmit = !!name && !!imgUri;
    var _c = native_1.useRoute().params, email = _c.email, pass = _c.pass;
    var onProceed = function () {
        dispatch(user_1.userActions.signup(pass || '', {
            displayName: name,
            imageUrl: imgUri,
            email: email || ''
        }));
    };
    var onUploadImage = function () {
        return HelperService_1["default"].uploadPhoto(setImgUri);
    };
    var onInput = function (input) {
        if (input) {
            return setName(input);
        }
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(react_native_1.ScrollView, { contentContainerStyle: [styles.scroll] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.header] },
                react_1["default"].createElement(react_native_1.Text, { style: [styles.title] }, "Create Profile")),
            react_1["default"].createElement(react_native_1.View, { style: styles.avatarContainer },
                react_1["default"].createElement(Avatar_1["default"], { onPress: onUploadImage, source: imgUri }),
                react_1["default"].createElement(react_native_paper_1.HelperText, { type: "info" },
                    '\n',
                    "Add Image",
                    '\n')),
            react_1["default"].createElement(Input_1["default"], { label: "Username", left: "account", onChangeText: onInput }),
            react_1["default"].createElement(react_native_paper_1.FAB, { style: styles.fab, icon: "arrow-right", onPress: onProceed, disabled: !enableSubmit, loading: authLoader }))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    scroll: {
        minHeight: styledComponents_1.maxHeight - 25,
        paddingHorizontal: 40
    },
    content: {
        height: styledComponents_1.maxHeight,
        backgroundColor: 'blue'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '15%'
    },
    title: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'SuezOne-Regular'
    },
    header: {
        height: 80,
        justifyContent: 'center'
    }
});
exports["default"] = Signup2;
