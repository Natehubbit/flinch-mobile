"use strict";
exports.__esModule = true;
exports.useToast = void 0;
var store_1 = require("../store");
exports.useToast = function () { return store_1.useSelector(function (state) { return state.toast; }); };
