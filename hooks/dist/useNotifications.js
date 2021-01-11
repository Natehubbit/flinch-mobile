"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var HelperService_1 = require("../services/HelperService");
var NotificationService_1 = require("../services/NotificationService");
var toast_1 = require("../store/toast");
var Notifications = require("expo-notifications");
var NavigationService_1 = require("../services/NavigationService");
var notifications_1 = require("../store/notifications");
var useUser_1 = require("./useUser");
var useNotifications = function () {
    var dispatch = react_redux_1.useDispatch();
    var user = useUser_1.useUser();
    var id = user.role === 'user'
        ? user.id
        : user.celebrity.id;
    var _a = react_1.useState(''), notification = _a[0], setNotification = _a[1];
    var _b = react_1.useState(false), showBadge = _b[0], setShowBadge = _b[1];
    var list = react_redux_1.useSelector(function (state) { return state.notifications; });
    react_1.useEffect(function () {
        NotificationService_1["default"]
            .listener(id, updateList);
        NotificationService_1["default"]
            .receivedListener(receivedCallback);
        NotificationService_1["default"]
            .responseListener(responseCallback);
        return function () { return NotificationService_1["default"]
            .removeListeners(); };
    }, []);
    react_1.useEffect(function () {
        if (!!notification) {
            dispatch(toast_1.toastActions.setToast({
                label: 'okay',
                msg: notification,
                show: true,
                mode: 'info'
            }));
            HelperService_1["default"].vibrate();
        }
    }, [notification]);
    react_1.useEffect(function () {
        var unread = list.filter(function (l) { return !l.read; }).length > 0;
        setShowBadge(unread);
    }, [list]);
    var updateList = function (data) {
        dispatch(notifications_1.notificationsActions.listen(data));
    };
    var receivedCallback = function (e) {
        var body = e.request.content.body;
        setNotification(body);
    };
    var responseCallback = function (e) {
        var actionIdentifier = e.actionIdentifier, notification = e.notification;
        if (actionIdentifier ===
            Notifications.DEFAULT_ACTION_IDENTIFIER) {
            var data = notification.request.content.data;
            NavigationService_1["default"].navigate('Request', { data: data });
        }
    };
    return {
        notification: notification,
        notificationList: list,
        showBadge: showBadge
    };
};
exports["default"] = useNotifications;
