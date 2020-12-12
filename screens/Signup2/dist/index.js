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
var Signup2 = function () {
    var dispatch = react_redux_1.useDispatch();
    // const user = useUser()
    var authLoader = useLoader_1.useLoader().authLoader;
    var _a = react_1.useState(''), name = _a[0], setName = _a[1];
    var _b = react_1.useState(false), submit = _b[0], setSubmit = _b[1];
    var _c = react_1.useState(''), imgUri = _c[0], setImgUri = _c[1];
    var onProceed = function () {
        dispatch(user_1.userActions.update({
            // ...user,
            displayName: name,
            imageUrl: imgUri
        }));
    };
    var onUploadImage = function () { return HelperService_1["default"]
        .uploadPhoto(setImgUri); };
    var onInput = function (input) {
        if (input) {
            setSubmit(true);
            return setName(input);
        }
        return setSubmit(false);
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: styles.container },
        react_1["default"].createElement(styledComponents_1.AuthContainer2, null,
            react_1["default"].createElement(styledComponents_1.FlexContainer, { style: styles.flexContainer, align: 'center', justify: 'center' },
                react_1["default"].createElement(Avatar_1["default"], { onPress: onUploadImage, source: imgUri }),
                react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'info' },
                    '\n',
                    "Add Image",
                    '\n')),
            react_1["default"].createElement(styledComponents_1.FlexContainer, { flex: 2 },
                react_1["default"].createElement(Input_1["default"], { label: 'Username', left: 'account', onChangeText: onInput }),
                react_1["default"].createElement(react_native_paper_1.FAB, { style: styles.fab, icon: 'arrow-right', onPress: onProceed, disabled: !submit, loading: authLoader })))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        height: styledComponents_1.maxHeight,
        backgroundColor: 'blue'
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 0
    },
    flexContainer: {
        marginTop: 50
    }
});
exports["default"] = Signup2;
