"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var react_redux_1 = require("react-redux");
var moment_1 = require("moment");
var styledComponents_1 = require("../../common/styledComponents");
var CelebRequestCard_1 = require("../../components/CelebRequestCard");
var Navbar_1 = require("../../components/Navbar");
var SectionHeader_1 = require("../../components/SectionHeader");
var theme_1 = require("../../config/theme");
var useLoader_1 = require("../../hooks/useLoader");
var useUser_1 = require("../../hooks/useUser");
var HelperService_1 = require("../../services/HelperService");
var requests_1 = require("../../store/requests");
var RequestService_1 = require("../../services/RequestService");
var STATS = [
    {
        label: 'Pending',
        value: 10,
        type: 'number'
    },
    {
        label: 'Earnings',
        value: 140,
        type: 'cash'
    },
    {
        label: 'Responses',
        value: 25,
        type: 'number'
    }
];
var CelebHome = function () {
    var dispatch = react_redux_1.useDispatch();
    var _a = react_1.useState([]), requests = _a[0], setRequests = _a[1];
    var _b = react_1.useState(null), unsubscribe = _b[0], setUnsubscribe = _b[1];
    var _c = react_1.useState(0), responseCount = _c[0], setResponseCount = _c[1];
    var noData = requests.length < 1;
    var _d = (useUser_1.useUser() || {
        celebrity: {
            data: {
                alias: '',
                imageUrl: ''
            }
        }
    }).celebrity, id = _d.id, _e = _d.data, uri = _e.imageUrl, alias = _e.alias;
    var loading = useLoader_1.useLoader().requestsLoader;
    react_1.useEffect(function () {
        dispatch(requests_1.requestsActions
            .listenForPending(setRequests, setUnsubscribe));
        RequestService_1["default"]
            .getCelebResponseCount(id, setResponseCount);
        return function () { return unsubscribe &&
            unsubscribe(); };
    }, []);
    var navigate = native_1.useNavigation().navigate;
    var onSeeAll = function () {
        navigate('Requests');
    };
    var renderStats = function () {
        return STATS.map(function (d, i) {
            var isCash = d.label === 'Earnings';
            var isPending = d.label === 'Pending';
            var isResponses = d.label === 'Responses';
            return react_1["default"].createElement(react_native_1.View, { style: [styles.stat], key: i },
                react_1["default"].createElement(styledComponents_1.AltMainLabel, { style: [styles.welcome] },
                    isCash && 'GHs',
                    isPending
                        ? requests.length
                        : isResponses
                            ? responseCount
                            : d.value),
                react_1["default"].createElement(styledComponents_1.AltMainLabel, { style: [styles.welcome, styles.mini] }, d.label));
        });
    };
    var renderNoData = function () {
        return (react_1["default"].createElement(react_native_1.View, { style: [styles.noData] },
            react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, "You have no pending requests.")));
    };
    return (react_1["default"].createElement(react_native_1.SafeAreaView, { style: [styles.container] },
        react_1["default"].createElement(Navbar_1["default"], { invert: true }),
        react_1["default"].createElement(react_native_1.ScrollView, { refreshControl: react_1["default"].createElement(react_native_1.RefreshControl, { refreshing: loading, colors: [theme_1.theme.colors.primary] }) },
            react_1["default"].createElement(react_native_1.View, { style: [styles.top] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.content] },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(styledComponents_1.AltMainLabel, { style: [styles.welcome] }, "Welcome,"),
                        react_1["default"].createElement(styledComponents_1.MainLabel, { style: [styles.name] }, alias)),
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: [styles.img] }))),
                react_1["default"].createElement(react_native_1.View, { style: [styles.stats] }, renderStats())),
            react_1["default"].createElement(react_native_1.View, { style: [styles.bottom] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.card] },
                    react_1["default"].createElement(react_native_1.View, { style: [styles.head] },
                        react_1["default"].createElement(SectionHeader_1["default"], { title: 'Requests' }),
                        react_1["default"].createElement(react_native_paper_1.TouchableRipple, { rippleColor: 'rgba(0,163,255,0.2)', style: [styles.touch], onPress: onSeeAll },
                            react_1["default"].createElement(styledComponents_1.Paragraph, { link: true }, "See all"))),
                    react_1["default"].createElement(react_native_paper_1.Divider, null),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.cards] }, requests.map(function (req) { return (react_1["default"].createElement(CelebRequestCard_1["default"], { ocassion: req.occasion, price: HelperService_1["default"].parseToMoney(req.price), recipient: req.recipient, key: req.id, time: moment_1["default"](req.timestamp).fromNow(), data: req })); }))),
                noData && renderNoData()))));
};
exports["default"] = CelebHome;
var styles = react_native_1.StyleSheet.create({
    container: {},
    top: {
        height: styledComponents_1.maxHeight * 0.25,
        backgroundColor: theme_1.theme.colors.primary
    },
    welcome: {
        fontSize: 15,
        color: theme_1.COLORS.white,
        fontWeight: 'normal',
        lineHeight: 16
    },
    content: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    name: {
        fontSize: 16,
        color: theme_1.COLORS.white
    },
    img: {
        height: 42,
        width: 42,
        borderRadius: 100
    },
    bottom: {
        paddingHorizontal: 12
    },
    card: {
        elevation: 1,
        backgroundColor: theme_1.COLORS.white,
        top: -40,
        borderRadius: 10,
        marginBottom: 40,
        overflow: 'hidden'
    },
    stats: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center',
        bottom: 50,
        position: 'absolute',
        width: '100%'
    },
    stat: {
        alignItems: 'center'
    },
    head: {
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    mini: {
        fontSize: 10
    },
    touch: {
        borderRadius: 100,
        padding: 2
    },
    cards: {
    // bottom: 200
    },
    noData: {
        height: styledComponents_1.maxHeight * 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
