"use strict";
exports.__esModule = true;
exports.useSelect = void 0;
var store_1 = require("../store");
exports.useSelect = function () { return store_1.useSelector(function (state) { return state.selector; }); };
