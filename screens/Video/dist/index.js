"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_paper_1 = require("react-native-paper");
var vector_icons_1 = require("@expo/vector-icons");
var LabelTag_1 = require("../../components/LabelTag");
var SectionHeader_1 = require("../../components/SectionHeader");
var VideoCardMini_1 = require("../../components/VideoCardMini");
var VideoPlayer_1 = require("../../components/VideoPlayer");
var theme_1 = require("../../config/theme");
var native_1 = require("@react-navigation/native");
var Video = function () {
    var _a = react_1.useState(false), showMenu = _a[0], setShowMenu = _a[1];
    var _b = native_1.useRoute().params, 
    // id,
    // duration,
    name = _b.name, recipient = _b.recipient, timestamp = _b.timestamp, uri = _b.uri;
    var onToggleMenu = function () {
        setShowMenu(!showMenu);
    };
    var onCloseMenu = function () {
        setShowMenu(false);
    };
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        react_1["default"].createElement(react_native_1.View, { style: [styles.videoContainer] },
            react_1["default"].createElement(VideoPlayer_1["default"], { uri: uri })),
        react_1["default"].createElement(react_native_1.View, { style: [styles.videoInfo] },
            react_1["default"].createElement(react_native_1.View, { style: [styles.panel] },
                react_1["default"].createElement(react_native_1.View, { style: [styles.info] },
                    react_1["default"].createElement(react_native_1.Text, { style: [styles.name] }, recipient),
                    react_1["default"].createElement(LabelTag_1["default"], null),
                    react_1["default"].createElement(react_native_1.View, { style: [styles.extraContainer] },
                        react_1["default"].createElement(react_native_1.View, { style: [styles.extra] },
                            react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'calendar', color: theme_1.COLORS.grey }),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles.mini] }, timestamp)),
                        react_1["default"].createElement(react_native_1.View, { style: [styles.extra] },
                            react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'star-outline', color: theme_1.COLORS.grey }),
                            react_1["default"].createElement(react_native_1.Text, { style: [styles.mini] }, name)))),
                react_1["default"].createElement(react_native_1.View, { style: [styles.more] },
                    react_1["default"].createElement(react_native_paper_1.Menu, { visible: showMenu, onDismiss: onCloseMenu, anchor: react_1["default"].createElement(react_native_1.View, { style: [styles.more] },
                            react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { onPress: onToggleMenu },
                                react_1["default"].createElement(vector_icons_1.MaterialCommunityIcons, { name: 'dots-vertical', size: 25 }))) },
                        react_1["default"].createElement(react_native_paper_1.Menu.Item, { title: 'Share' })))),
            react_1["default"].createElement(react_native_gesture_handler_1.ScrollView, { contentContainerStyle: [styles.othersContainer] },
                react_1["default"].createElement(SectionHeader_1["default"], { title: 'Others' }),
                react_1["default"].createElement(react_native_1.View, { style: [styles.videosContainer] },
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null),
                    react_1["default"].createElement(VideoCardMini_1["default"], null)))),
        react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'share', style: [styles.fab] })));
};
exports["default"] = Video;
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    videoContainer: {
        flex: 1
    },
    videoInfo: {
        flex: 2
    },
    panel: {
        height: 90,
        elevation: 2,
        backgroundColor: theme_1.COLORS.white,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 29,
        paddingVertical: 15
    },
    othersContainer: {
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    videosContainer: {
        marginVertical: 18
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15
    },
    name: {
        fontFamily: 'Rubik-Regular',
        fontSize: 15
    },
    info: {
        justifyContent: 'space-between'
    },
    more: {
        justifyContent: 'center'
    },
    mini: {
        color: theme_1.COLORS.grey,
        fontSize: 10,
        marginLeft: 5
    },
    extraContainer: {
        flexDirection: 'row'
    },
    extra: {
        flexDirection: 'row',
        marginRight: 10
    }
});
