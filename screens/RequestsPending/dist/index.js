"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var RequestCard_1 = require("../../components/RequestCard");
var theme_1 = require("../../config/theme");
var useLoader_1 = require("../../hooks/useLoader");
var useRequests_1 = require("../../hooks/useRequests");
var useUser_1 = require("../../hooks/useUser");
var HelperService_1 = require("../../services/HelperService");
var requests_1 = require("../../store/requests");
var RequestsPending = function () {
    var requests = useRequests_1.useRequests('status', 'pending');
    var dispatch = react_redux_1.useDispatch();
    var navigate = native_1.useNavigation().navigate;
    var _a = react_1.useState(false), refresh = _a[0], setRefresh = _a[1];
    var id = useUser_1.useUser().id;
    var loading = useLoader_1.useLoader().requestsLoader;
    react_1.useEffect(function () {
        fetchData();
    }, []);
    // useEffect(() => {
    //   setRefresh(false)
    // }, [requests])
    var fetchData = function () {
        dispatch(requests_1.requestsActions.getAllRequests(id));
    };
    var onReload = function () {
        setRefresh(true);
        var endRefresh = function () { return setRefresh(false); };
        dispatch(requests_1.requestsActions.reloadRequests(id, endRefresh));
    };
    var onOpenRequest = function (id) { return navigate('Request', { id: id }); };
    var renderRequests = function () {
        var requestEmpty = requests.length < 1;
        return requestEmpty
            ? react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { contentContainerStyle: [styles.noData], refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refresh, onRefresh: onReload, colors: [theme_1.theme.colors.primary] }) },
                react_1["default"].createElement(react_native_paper_1.HelperText, { type: 'info' }, "No pending requests"))
            : react_1["default"].createElement(react_native_1.FlatList, { data: requests, contentContainerStyle: [styles.listContainer], renderItem: function (_a) {
                    var item = _a.item;
                    return react_1["default"].createElement(RequestCard_1["default"], { name: item.recipient, occasion: item.occasion, imageUrl: item.celebrity.imageUrl, price: HelperService_1["default"].parseToMoney(item.price), tag: item.status, onPress: function () { return onOpenRequest(item.id); } });
                }, refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: refresh, onRefresh: onReload, colors: [theme_1.theme.colors.primary] }), initialNumToRender: 7, keyExtractor: function (item, i) { return item.id || i.toString(); } });
    };
    return loading
        ? react_1["default"].createElement(react_native_1.View, { style: [styles.loader] },
            react_1["default"].createElement(react_native_paper_1.ActivityIndicator, { animating: true, size: 'small' }))
        : react_1["default"].createElement(react_1["default"].Fragment, null, renderRequests());
};
exports["default"] = RequestsPending;
var styles = react_native_1.StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noData: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingBottom: 50
    }
});
