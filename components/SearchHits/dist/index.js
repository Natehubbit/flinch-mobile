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
var react_instantsearch_core_1 = require("react-instantsearch-core");
var react_native_1 = require("react-native");
var SearchItem_1 = require("../SearchItem");
// import Algolia from '../../assets/images/algolia.svg'
var searchAlgolia_svg_1 = require("../../assets/images/searchAlgolia.svg");
var theme_1 = require("../../config/theme");
var styledComponents_1 = require("../../common/styledComponents");
var SearchHits = function (_a) {
    var hits = _a.hits, hasMore = _a.hasMore, refineNext = _a.refineNext, onPress = _a.onPress;
    var renderLogo = function () {
        var hasHits = hits.length > 0;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            !hasHits && react_1["default"].createElement(react_native_1.View, { style: [styles.noData] },
                react_1["default"].createElement(styledComponents_1.Paragraph, { black: true }, "No data found")),
            react_1["default"].createElement(react_native_1.View, { style: [styles.algolia] },
                react_1["default"].createElement(searchAlgolia_svg_1["default"], null))));
    };
    return react_1["default"].createElement(react_native_1.FlatList, { data: hits, keyExtractor: function (item) { return item.objectID; }, onEndReached: hasMore && refineNext, ListFooterComponent: renderLogo(), renderItem: function (_a) {
            var item = _a.item;
            return (react_1["default"].createElement(SearchItem_1["default"], { label: item.alias, uri: item.imageUrl, onPress: function () { return onPress(__assign(__assign({}, item), { id: item.objectID })); } }));
        } });
};
exports["default"] = react_instantsearch_core_1.connectInfiniteHits(SearchHits);
var styles = react_native_1.StyleSheet.create({
    algolia: {
        padding: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: theme_1.COLORS.light2
    },
    noData: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    }
});
