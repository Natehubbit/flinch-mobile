"use strict";
exports.__esModule = true;
exports.useDownload = void 0;
var store_1 = require("../store");
exports.useDownload = function (id) { return store_1.useSelector(function (state) {
    var downloads = state.downloads;
    return id
        ? downloads.find(function (d) { return d.id === id; })
        : {
            hook: null,
            id: '',
            progress: 0,
            state: ''
        };
}); };
