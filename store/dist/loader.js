'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (
          var s, i = 1, n = arguments.length;
          i < n;
          i++
        ) {
          s = arguments[i]
          for (var p in s)
            if (
              Object.prototype.hasOwnProperty.call(
                s,
                p
              )
            )
              t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s)
      if (
        Object.prototype.hasOwnProperty.call(
          s,
          p
        ) &&
        e.indexOf(p) < 0
      )
        t[p] = s[p]
    if (
      s != null &&
      typeof Object.getOwnPropertySymbols ===
        'function'
    )
      for (
        var i = 0,
          p = Object.getOwnPropertySymbols(s);
        i < p.length;
        i++
      ) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(
            s,
            p[i]
          )
        )
          t[p[i]] = s[p[i]]
      }
    return t
  }
var _a
exports.__esModule = true
exports.loaderActions = exports.loaderSlice = exports.actions = void 0
var toolkit_1 = require('@reduxjs/toolkit')
var initState = {
  authLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  celebsLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  bookingLoader: {
    isLoading: false,
    body: null
  },
  paymentLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  requestsLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  responseLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  },
  videosResponseLoader: {
    isLoading: false,
    body: null,
    label: '',
    showBtns: false,
    type: 'loader'
  }
}
;(exports.actions = ((_a = toolkit_1.createSlice({
  name: 'loader',
  initialState: initState,
  reducers: {
    loading: function (state, _a) {
      var _b
      var payload = _a.payload
      return __assign(
        __assign({}, state),
        ((_b = {}),
        (_b[payload] = __assign(
          __assign({}, state[payload]),
          {
            isLoading: true
          }
        )),
        _b)
      )
    },
    loaded: function (state, _a) {
      var _b
      var payload = _a.payload
      return __assign(
        __assign({}, state),
        ((_b = {}),
        (_b[payload] = __assign(
          __assign({}, state[payload]),
          {
            isLoading: false
          }
        )),
        _b)
      )
    },
    update: function (state, _a) {
      var _b
      var payload = _a.payload
      var key = payload.key,
        data = payload.data
      return __assign(
        __assign({}, state),
        ((_b = {}),
        (_b[key] = __assign(
          __assign({}, state[key]),
          data
        )),
        _b)
      )
    },
    resetLoaders: function () {
      return initState
    }
  }
})),
_a).actions),
  (exports.loaderSlice = __rest(_a, ['actions']))
exports.loaderActions = __assign(
  {},
  exports.actions
)
