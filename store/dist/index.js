"use strict";
var _a;
exports.__esModule = true;
exports.useSelector = exports.persistor = exports.store = void 0;
/* eslint-disable no-unused-vars */
var toolkit_1 = require("@reduxjs/toolkit");
var react_redux_1 = require("react-redux");
var celebs_1 = require("./celebs");
var loader_1 = require("./loader");
var redux_persist_1 = require("redux-persist");
var async_storage_1 = require("@react-native-community/async-storage");
var user_1 = require("./user");
var request_1 = require("./request");
var requests_1 = require("./requests");
var toast_1 = require("./toast");
var response_1 = require("./response");
var downloads_1 = require("./downloads");
var selector_1 = require("./selector");
var rootReducer = toolkit_1.combineReducers((_a = {},
    _a[user_1.userSlice.name] = user_1.userSlice.reducer,
    _a[loader_1.loaderSlice.name] = loader_1.loaderSlice.reducer,
    _a[celebs_1.celebsSlice.name] = celebs_1.celebsSlice.reducer,
    _a[request_1.requestSlice.name] = request_1.requestSlice.reducer,
    _a[requests_1.requestsSlice.name] = requests_1.requestsSlice.reducer,
    _a[toast_1.toastSlice.name] = toast_1.toastSlice.reducer,
    _a[response_1.responseSlice.name] = response_1.responseSlice.reducer,
    _a[downloads_1.downloadsSlice.name] = downloads_1.downloadsSlice.reducer,
    _a[selector_1.selectorSlice.name] = selector_1.selectorSlice.reducer,
    _a));
var persistConfig = {
    key: 'root',
    blacklist: ['loader', 'toast', 'downloads', 'selector'],
    storage: async_storage_1["default"],
    timeout: 10000
};
var persistedReducer = redux_persist_1.persistReducer(persistConfig, rootReducer);
exports.store = toolkit_1.configureStore({
    reducer: persistedReducer,
    middleware: toolkit_1.getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false
    })
});
exports.persistor = redux_persist_1.persistStore(exports.store);
exports.useSelector = react_redux_1.useSelector;
