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
exports.selectorActions = exports.selectorSlice = exports.actions = void 0
var toolkit_1 = require('@reduxjs/toolkit')
var initState = {
  title: 'Choose an option',
  show: false,
  options: [],
  value: '',
  onSelect: function () {}
}
;(exports.actions = ((_a = toolkit_1.createSlice({
  name: 'selector',
  initialState: initState,
  reducers: {
    setSelector: function (state, _a) {
      var payload = _a.payload
      return __assign(
        __assign({}, state),
        payload
      )
    },
    resetSelector: function () {
      return initState
    }
  }
})),
_a).actions),
  (exports.selectorSlice = __rest(_a, [
    'actions'
  ]))
var openSelector = function (
  options,
  selectorTitle,
  val,
  onSelect
) {
  return function (dispatch, getState) {
    var _a = getState().selector,
      title = _a.title,
      value = _a.value
    dispatch(
      exports.actions.setSelector({
        title: selectorTitle || title,
        value: val || value,
        show: true,
        options: options,
        onSelect: onSelect || null
      })
    )
  }
}
var closeSelector = function () {
  return function (dispatch) {
    dispatch(exports.actions.resetSelector())
  }
}
exports.selectorActions = __assign(
  __assign({}, exports.actions),
  {
    openSelector: openSelector,
    closeSelector: closeSelector
  }
)
