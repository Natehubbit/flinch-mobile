"use strict";
exports.__esModule = true;
var native_1 = require("@react-navigation/native");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var styledComponents_1 = require("../../common/styledComponents");
// import { Celeb } from '../../services/CelebService'
// interface CelebProps extends Celeb {
// }
var CelebScreen = function () {
    var navigate = native_1.useNavigation().navigate;
    var params = native_1.useRoute().params;
    var data = params.data;
    var id = data.id, alias = data.alias, bio = data.bio, craft = data.craft, imageUrl = data.imageUrl, price = data.price;
    var onBook = function () { return navigate('Book', { data: { id: id, price: price, alias: alias, imageUrl: imageUrl } }); };
    return react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.ImageBackground, { source: { uri: imageUrl }, style: styles.image, blurRadius: 100 },
            react_1["default"].createElement(react_native_1.Image, { source: {
                    uri: imageUrl
                }, style: { flex: 1, width: undefined, height: undefined }, resizeMode: 'contain' })),
        react_1["default"].createElement(react_native_1.View, { style: styles.dets },
            react_1["default"].createElement(react_native_paper_1.FAB, { icon: 'wallet', style: styles.fab, label: 'book', onPress: onBook }),
            react_1["default"].createElement(react_native_1.View, { style: styles.label },
                react_1["default"].createElement(styledComponents_1.MainLabel, null, alias),
                react_1["default"].createElement(styledComponents_1.MiniLabel, null, craft)),
            react_1["default"].createElement(react_native_1.View, { style: styles.bio },
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, bio)),
            react_1["default"].createElement(react_native_1.View, { style: styles.price },
                react_1["default"].createElement(styledComponents_1.AltMainLabel, { style: styles.price },
                    "GHs",
                    price))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        height: styledComponents_1.maxHeight * 0.45,
        width: styledComponents_1.maxWidth
    },
    fab: {
        position: 'absolute',
        bottom: '115%',
        right: 12
    },
    label: {
        flex: 1
    },
    bio: {
        flex: 2
        // alignItems:'center'
    },
    dets: {
        paddingHorizontal: 12,
        paddingTop: 50,
        paddingBottom: 12,
        flex: 1
    },
    price: {}
});
exports["default"] = CelebScreen;
