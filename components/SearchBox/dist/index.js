"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_instantsearch_native_1 = require("react-instantsearch-native");
var react_native_1 = require("react-native");
var react_native_paper_1 = require("react-native-paper");
var SearchBox = function (_a) {
    var currentRefinement = _a.currentRefinement, refine = _a.refine;
    return (react_1["default"].createElement(react_native_paper_1.Searchbar, { value: currentRefinement, onChangeText: refine, placeholder: 'Search', style: styles.search }));
};
exports["default"] = react_instantsearch_native_1.connectSearchBox(SearchBox);
var styles = react_native_1.StyleSheet.create({
    search: {}
});
