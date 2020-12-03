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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _a;
exports.__esModule = true;
exports.downloadActions = exports.downloadsSlice = exports.actions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var HelperService_1 = require("../services/HelperService");
var initState = [];
exports.actions = (_a = toolkit_1.createSlice({
    name: 'downloads',
    initialState: initState,
    reducers: {
        add: function (state, _a) {
            var payload = _a.payload;
            return __spreadArrays(state, [payload]);
        },
        update: function (state, _a) {
            var payload = _a.payload;
            return state.map(function (d) {
                if (d.id === payload.id) {
                    return payload;
                }
                return d;
            });
        },
        updateField: function (state, _a) {
            var payload = _a.payload;
            var id = payload.id, key = payload.key, val = payload.val;
            return state.map(function (d) {
                var _a;
                if (d.id === id) {
                    return __assign(__assign({}, d), (_a = {}, _a[key] = val, _a));
                }
                return d;
            });
        },
        clearDownloads: function () {
            return initState;
        }
    }
}), _a).actions, exports.downloadsSlice = __rest(_a, ["actions"]);
var start = function (id, url, ext) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var downloads, exists, callback, download, downloaded;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                downloads = getState().downloads;
                exists = downloads.find(function (d) { return d.id === id; });
                if (!!exists) return [3 /*break*/, 2];
                callback = function (progress) {
                    // dispatch(actions.updateField({
                    //   id,
                    //   key: 'progress',
                    //   val: progress
                    // }))
                };
                download = HelperService_1["default"].createDownload(id, url, ext, callback);
                dispatch(exports.actions.add(__assign(__assign({}, download), { state: 'downloading' })));
                return [4 /*yield*/, HelperService_1["default"]
                        .downloadFile(id, url, ext, callback)];
            case 1:
                downloaded = _a.sent();
                downloaded &&
                    dispatch(exports.actions.update(__assign(__assign({}, downloaded), { state: 'done' })));
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); }; };
exports.downloadActions = {
    start: start
};
