"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var styledComponents_1 = require("../../common/styledComponents");
var book_svg_1 = require("../../assets/images/book.svg");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var Input_1 = require("../../components/Input");
var native_1 = require("@react-navigation/native");
var react_native_paper_1 = require("react-native-paper");
var forms_1 = require("../../config/forms");
var formik_1 = require("formik");
var useUser_1 = require("../../hooks/useUser");
var react_redux_1 = require("react-redux");
var request_1 = require("../../store/request");
var useLoader_1 = require("../../hooks/useLoader");
var useRequest_1 = require("../../hooks/useRequest");
var Book = function () {
    var dispatch = react_redux_1.useDispatch();
    var request = useRequest_1.useRequest();
    var mounted = react_1.useRef(false);
    var booking = useLoader_1.useLoader().bookingLoader;
    var navigate = native_1.useNavigation().navigate;
    var data = native_1.useRoute().params.data;
    var _a = useUser_1.useUser(), displayName = _a.displayName, userId = _a.id;
    var id = data.id, price = data.price, alias = data.alias, imageUrl = data.imageUrl;
    react_1.useEffect(function () {
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            !booking &&
                request.id &&
                navigate('Payment');
        }
    }, [booking]);
    var onSubmit = function (values) {
        var data = __assign({ celebrity: {
                id: id,
                name: alias,
                imageUrl: imageUrl
            }, requestor: {
                id: userId,
                name: displayName
            }, response: {
                status: 'pending',
                videoUri: '',
                duration: 0,
                thumbnailUri: '',
                timestamp: Date.now()
            }, payment: {
                id: '',
                amount: 0,
                payed: false,
                timestamp: 0
            }, status: 'pending', price: price, timestamp: Date.now() }, values);
        dispatch(request_1.requestActions.createRequest(data));
        request.id &&
            navigate('Payment');
    };
    var renderForm = function () {
        return (react_1["default"].createElement(formik_1.Formik, { initialValues: forms_1.BOOK_FORM, onSubmit: onSubmit, validationSchema: forms_1.BookSchema, enableReinitialize: true }, function (_a) {
            var errors = _a.errors, touched = _a.touched, values = _a.values, handleSubmit = _a.handleSubmit, handleChange = _a.handleChange;
            var instructions = values.instructions, occasion = values.occasion, recipient = values.recipient;
            return react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Input_1["default"], { label: 'Recipient Name', left: 'account', value: recipient, disabled: booking, onChangeText: handleChange('recipient') }),
                errors.recipient && touched.recipient && (react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'error' }, errors.recipient)),
                react_1["default"].createElement(Input_1["default"], { label: 'Occasion', left: 'calendar', disabled: booking, value: occasion, onChangeText: handleChange('occasion') }),
                errors.occasion && touched.occasion && (react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'error' }, errors.occasion)),
                react_1["default"].createElement(Input_1["default"], { disabled: booking, label: 'Instructions', left: 'information', style: { height: 83 }, value: instructions, onChangeText: handleChange('instructions'), multiline: true }),
                errors.instructions && touched.instructions && (react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'error' }, errors.instructions)),
                react_1["default"].createElement(react_native_paper_1.Button, { uppercase: false, mode: 'contained', theme: { roundness: 100 }, style: styles.btn, onPress: handleSubmit, loading: booking, disabled: booking }, "Submit"));
        }));
    };
    return react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { style: styles.container },
        react_1["default"].createElement(book_svg_1["default"], { style: styles.image, width: styledComponents_1.maxWidth }),
        react_1["default"].createElement(react_native_1.View, { style: styles.card },
            react_1["default"].createElement(react_native_1.View, { style: styles.celeb },
                react_1["default"].createElement(react_native_1.Image, { source: { uri: imageUrl }, style: styles.celebDp }),
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, alias)),
            renderForm()));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    image: {
        width: styledComponents_1.maxWidth,
        marginVertical: 20
    },
    btn: {
        marginTop: 24,
        marginBottom: 12,
        height: 50,
        justifyContent: 'center'
    },
    celeb: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    celebDp: {
        height: 35,
        width: 35,
        borderRadius: 100,
        marginRight: 12
    },
    card: {
        elevation: 4,
        padding: 20,
        backgroundColor: 'white',
        width: styledComponents_1.maxWidth * 0.9,
        alignSelf: 'center',
        marginVertical: 10,
        shadowColor: 'red',
        borderRadius: 10
    }
});
exports["default"] = Book;
