"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var constants_1 = require("../../common/constants");
var styledComponents_1 = require("../../common/styledComponents");
var Input_1 = require("../../components/Input");
var useUser_1 = require("../../hooks/useUser");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Navbar_1 = require("../../components/Navbar");
var native_1 = require("@react-navigation/native");
var react_native_paper_1 = require("react-native-paper");
var vector_icons_1 = require("@expo/vector-icons");
var theme_1 = require("../../config/theme");
var HelperService_1 = require("../../services/HelperService");
var react_redux_1 = require("react-redux");
var user_1 = require("../../store/user");
var useLoader_1 = require("../../hooks/useLoader");
var bck = require('../../assets/images/profileBck.png');
var Profile = function () {
    var dispatch = react_redux_1.useDispatch();
    var loading = useLoader_1.useLoader().authLoader;
    var _a = react_1.useState(false), editting = _a[0], setEditting = _a[1];
    var _b = react_1.useState(false), submitting = _b[0], setSubmitting = _b[1];
    var _c = react_1.useState(null), imgUri = _c[0], setImgUri = _c[1];
    var _d = react_1.useState(''), password = _d[0], setPassword = _d[1];
    var _e = react_native_1.useWindowDimensions(), height = _e.height, width = _e.width;
    var route = native_1.useRoute().name;
    var _f = useUser_1.useUser(), id = _f.id, imageUrl = _f.imageUrl, name = _f.displayName, email = _f.email;
    var _g = react_1.useState(editting
        ? name
        : ''), userName = _g[0], setUserName = _g[1];
    var _h = react_1.useState(editting
        ? email
        : ''), userEmail = _h[0], setUserEmail = _h[1];
    react_1.useEffect(function () {
        editting
            ? initData()
            : clearData();
    }, [editting]);
    react_1.useEffect(function () {
        !loading && !submitting &&
            setEditting(false);
    }, [loading, submitting]);
    var imgHeight = height * 0.2;
    var img = imgUri || imageUrl;
    var showPass = !((userEmail === '') ||
        (userEmail === email)) &&
        editting;
    var onEditting = function () {
        setEditting(true);
    };
    var onUpdateImg = function () {
        HelperService_1["default"].uploadPhoto(setImgUri);
    };
    var onSave = function () {
        setSubmitting(true);
        var data = userEmail === email
            ? {
                id: id,
                displayName: userName,
                imageUrl: img
            }
            : {
                id: id,
                displayName: userName,
                email: userEmail,
                imageUrl: img
            };
        showPass
            ? dispatch(user_1.userActions.update(data, password))
            : dispatch(user_1.userActions.update(data));
        setSubmitting(false);
    };
    var onCancel = function () {
        setEditting(false);
    };
    var initData = function () {
        setUserEmail(email);
        setUserName(name);
    };
    var clearData = function () {
        setUserEmail('');
        setUserName('');
    };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(Navbar_1["default"], { edit: true, title: route, hideBell: true, showCancel: editting, onEdit: onEditting, onCancel: onCancel }),
        react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
            react_1["default"].createElement(react_native_1.ScrollView, null,
                react_1["default"].createElement(react_native_1.View, { style: [
                        { width: width, height: imgHeight }
                    ] },
                    react_1["default"].createElement(react_native_1.ImageBackground, { style: { flex: 1 }, source: bck })),
                react_1["default"].createElement(react_native_1.View, { style: [styles.imgContainer] },
                    react_1["default"].createElement(react_native_1.View, { style: [styles.dp] },
                        react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { disabled: !editting, onPress: onUpdateImg },
                                react_1["default"].createElement(react_native_1.Image, { source: { uri: img }, style: [styles.img] }),
                                editting && react_1["default"].createElement(react_native_1.View, { style: [styles.overlay] },
                                    react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'plus-circle-outline', size: 25, color: theme_1.COLORS.white })))))),
                react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                    react_1["default"].createElement(react_native_1.View, { style: [styles.profileInfo] },
                        react_1["default"].createElement(styledComponents_1.AltMiniLabel, null, name),
                        react_1["default"].createElement(styledComponents_1.Paragraph, { light: true }, email)),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.form] }, constants_1.PROFILE_FORM.map(function (d, i) {
                        var val = d.type === 'name'
                            ? userName
                            : d.type === 'email'
                                ? userEmail
                                : password;
                        var onChange = d.type === 'name'
                            ? setUserName
                            : d.type === 'email'
                                ? setUserEmail
                                : setPassword;
                        var isPass = d.type === 'password';
                        return (isPass)
                            ? showPass &&
                                react_1["default"].createElement(react_1["default"].Fragment, null,
                                    react_1["default"].createElement(Input_1["default"], { key: i, placeholder: d.placeholder, left: d.left, right: d.right, disabled: !editting, value: val, secureTextEntry: isPass, onChangeText: onChange }),
                                    react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'error' }, "Enter your password if you are updating your email."))
                            : react_1["default"].createElement(Input_1["default"], { key: i, placeholder: d.placeholder, left: d.left, right: d.right, disabled: !editting, value: val, onChangeText: onChange });
                    })))),
            editting && react_1["default"].createElement(react_native_1.View, { style: [styles.actions] },
                react_1["default"].createElement(react_native_paper_1.Button, { uppercase: false, mode: 'contained', style: [styles.btn], onPress: onSave }, "Save")))));
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
    overlay: {
        position: 'absolute',
        borderRadius: 100,
        height: '100%',
        width: '100%',
        backgroundColor: theme_1.COLORS.light,
        justifyContent: 'center',
        alignItems: 'center'
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
        paddingVertical: 15,
        elevation: 10,
        backgroundColor: theme_1.COLORS.white,
        paddingHorizontal: 40
    },
    btn: {
        borderRadius: 100
    }
});
