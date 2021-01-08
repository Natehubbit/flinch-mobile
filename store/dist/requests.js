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
var _a;
exports.__esModule = true;
exports.requestsActions = exports.requestsSlice = exports.actions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var react_native_1 = require("react-native");
var RequestService_1 = require("../services/RequestService");
var loader_1 = require("./loader");
var response_1 = require("./response");
var initState = [];
exports.actions = (_a = toolkit_1.createSlice({
    name: 'requests',
    initialState: initState,
    reducers: {
        getRequests: function (state, _a) {
            var payload = _a.payload;
            return payload;
        },
        clearRequests: function () {
            return initState;
        }
    }
}), _a).actions, exports.requestsSlice = __rest(_a, ["actions"]);
var getAllRequests = function () { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, role, user, isUser, id, res, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dispatch(loader_1.loaderActions.loading('requestsLoader'));
                _a = getState().user, role = _a.role, user = __rest(_a, ["role"]);
                isUser = role === 'user';
                id = isUser
                    ? user.id
                    : user.celebrity.id;
                if (!isUser) return [3 /*break*/, 2];
                return [4 /*yield*/, RequestService_1["default"].getAllRequests(id)];
            case 1:
                res = _b.sent();
                res && dispatch(exports.actions.getRequests(res));
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, RequestService_1["default"].getCelebRequests(id)];
            case 3:
                res = _b.sent();
                res && dispatch(exports.actions.getRequests(res));
                _b.label = 4;
            case 4:
                dispatch(loader_1.loaderActions.loaded('requestsLoader'));
                return [2 /*return*/];
        }
    });
}); }; };
var reloadRequests = function (callback) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, role, user, isUser, id, res, res;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getState().user, role = _a.role, user = __rest(_a, ["role"]);
                isUser = role === 'user';
                id = isUser
                    ? user.id
                    : user.celebrity.id;
                if (!isUser) return [3 /*break*/, 2];
                return [4 /*yield*/, RequestService_1["default"].getAllRequests(id)];
            case 1:
                res = _b.sent();
                res && dispatch(exports.actions.getRequests(res));
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, RequestService_1["default"].getCelebRequests(id)];
            case 3:
                res = _b.sent();
                res && dispatch(exports.actions.getRequests(res));
                _b.label = 4;
            case 4:
                callback && callback();
                return [2 /*return*/];
        }
    });
}); }; };
var rejectRequest = function (id, callback) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, requests, role, rejected, data;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = getState(), requests = _a.requests, role = _a.user.role;
                if (role === 'user')
                    return [2 /*return*/];
                return [4 /*yield*/, RequestService_1["default"].rejectRequest(id)];
            case 1:
                rejected = _b.sent();
                data = rejected && requests.filter(function (d) { return d.id !== id; });
                data && dispatch(exports.actions.getRequests(data));
                callback && callback();
                return [2 /*return*/];
        }
    });
}); }; };
var approveRequest = function (id, uri, callback) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, requests, _b, role, userId, loading, approved, data;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = getState(), requests = _a.requests, _b = _a.user, role = _b.role, userId = _b.celebrity.id;
                if (role === 'user')
                    return [2 /*return*/];
                loading = function () { return dispatch(loader_1.loaderActions.loading('responseLoader')); };
                return [4 /*yield*/, RequestService_1["default"]
                        .approveRequest(id, uri, loading)];
            case 1:
                approved = _c.sent();
                if (approved) {
                    data = requests.map(function (d) {
                        if (d.id === id) {
                            return __assign(__assign({}, d), approved);
                        }
                        return d;
                    });
                    dispatch(exports.actions.getRequests(data));
                    dispatch(response_1.responseActions.reloadApproved(userId));
                    callback && callback();
                }
                else {
                    react_native_1.Alert.alert('Error', 'Failed to upload Video. Please try again.', [
                        { text: 'Okay', style: 'cancel' }
                    ]);
                }
                return [2 /*return*/];
        }
    });
}); }; };
exports.requestsActions = __assign(__assign({}, exports.actions), { rejectRequest: rejectRequest,
    getAllRequests: getAllRequests,
    approveRequest: approveRequest,
    reloadRequests: reloadRequests });
