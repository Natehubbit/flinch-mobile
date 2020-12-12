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
var SearchHits = function (_a) {
    var hits = _a.hits, hasMore = _a.hasMore, refineNext = _a.refineNext, onPress = _a.onPress;
    return react_1["default"].createElement(react_native_1.FlatList, { data: hits, keyExtractor: function (item) { return item.objectID; }, onEndReached: hasMore && refineNext, renderItem: function (_a) {
            var item = _a.item;
            return (react_1["default"].createElement(SearchItem_1["default"], { label: item.alias, uri: item.imageUrl, onPress: function () { return onPress(__assign(__assign({}, item), { id: item.objectID })); } }));
        } });
};
exports["default"] = react_instantsearch_core_1.connectInfiniteHits(SearchHits);
