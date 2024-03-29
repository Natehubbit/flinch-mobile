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
exports.userActions = exports.userSlice = exports.actions = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var AuthService_1 = require("../services/AuthService");
var loader_1 = require("./loader");
var UserService_1 = require("../services/UserService");
var HelperService_1 = require("../services/HelperService");
var initState = {
    id: '',
    displayName: '',
    email: '',
    imageUrl: '',
    loggedIn: false,
    profileUpdated: false,
    role: 'user',
    isCelebrity: false,
    token: null
};
exports.actions = (_a = toolkit_1.createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        getUser: function (state, _a) {
            var payload = _a.payload;
            return __assign(__assign({}, state), payload);
        },
        updateUser: function (state, _a) {
            var payload = _a.payload;
            return __assign(__assign({}, state), payload);
        },
        clearUser: function () {
            return initState;
        }
    }
}), _a).actions, exports.userSlice = __rest(_a, ["actions"]);
var login = function (email, password) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userData, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dispatch(loader_1.loaderActions.loading('authLoader'));
                return [4 /*yield*/, AuthService_1["default"].login(email, password)];
            case 1:
                user = _b.sent();
                _a = user;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, UserService_1["default"].getUser(user.id)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                userData = _a;
                userData && dispatch(exports.actions.getUser(__assign({ id: '', displayName: '', email: '', imageUrl: '', isCelebrity: false, role: 'user', loggedIn: true, profileUpdated: true }, userData)));
                dispatch(loader_1.loaderActions.loaded('authLoader'));
                return [2 /*return*/];
        }
    });
}); }; };
var signup = function (email, password) { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userData, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                dispatch(loader_1.loaderActions.loading('authLoader'));
                return [4 /*yield*/, AuthService_1["default"].signUp(email, password)];
            case 1:
                user = _b.sent();
                _a = user;
                if (!_a) return [3 /*break*/, 3];
                return [4 /*yield*/, UserService_1["default"].addUser(user)];
            case 2:
                _a = (_b.sent());
                _b.label = 3;
            case 3:
                userData = _a;
                userData && dispatch(exports.actions.getUser(__assign(__assign({}, userData), { loggedIn: true })));
                dispatch(loader_1.loaderActions.loaded('authLoader'));
                return [2 /*return*/];
        }
    });
}); }; };
var signout = function () { return function (dispatch) { return __awaiter(void 0, void 0, void 0, function () {
    var isSignedOut;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dispatch(loader_1.loaderActions.loading('authLoader'));
                return [4 /*yield*/, AuthService_1["default"].signout()];
            case 1:
                isSignedOut = _a.sent();
                isSignedOut && dispatch(exports.actions.clearUser());
                dispatch(loader_1.loaderActions.loaded('authLoader'));
                return [2 /*return*/];
        }
    });
}); }; };
var update = function (data, pass) { return function (dispatch, getState) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, imageUrl, mail, img, id, blob, uri, auth, updated, _b, user, _c, updated;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                dispatch(loader_1.loaderActions.loading('authLoader'));
                _a = getState().user, imageUrl = _a.imageUrl, mail = _a.email;
                img = data.imageUrl, id = data.id;
                if (!(img && (imageUrl !== img))) return [3 /*break*/, 3];
                return [4 /*yield*/, HelperService_1["default"]
                        .parseToBlob(img)];
            case 1:
                blob = _d.sent();
                return [4 /*yield*/, HelperService_1["default"]
                        .generateBlobUrl("user/" + id, blob)];
            case 2:
                uri = _d.sent();
                data = __assign(__assign({}, data), { imageUrl: uri });
                _d.label = 3;
            case 3:
                if (!(data.email && pass)) return [3 /*break*/, 9];
                return [4 /*yield*/, AuthService_1["default"]
                        .login(mail, pass)];
            case 4:
                auth = _d.sent();
                _b = auth;
                if (!_b) return [3 /*break*/, 6];
                return [4 /*yield*/, AuthService_1["default"]
                        .updateAuthEmail(data.email)];
            case 5:
                _b = (_d.sent());
                _d.label = 6;
            case 6:
                updated = _b;
                _c = updated;
                if (!_c) return [3 /*break*/, 8];
                return [4 /*yield*/, UserService_1["default"]
                        .update(data)];
            case 7:
                _c = (_d.sent());
                _d.label = 8;
            case 8:
                user = _c;
                user && dispatch(exports.actions
                    .getUser(__assign(__assign({}, user), { profileUpdated: true })));
                return [3 /*break*/, 11];
            case 9: return [4 /*yield*/, UserService_1["default"]
                    .update(data)];
            case 10:
                updated = _d.sent();
                updated && dispatch(exports.actions
                    .getUser(__assign(__assign({}, updated), { profileUpdated: true })));
                _d.label = 11;
            case 11:
                dispatch(loader_1.loaderActions.loaded('authLoader'));
                return [2 /*return*/];
        }
    });
}); }; };
var updateProfile = function (data) { return function (dispatch) {
    dispatch(exports.actions.updateUser(data));
}; };
exports.userActions = {
    login: login,
    signup: signup,
    signout: signout,
    update: update,
    updateProfile: updateProfile
};
