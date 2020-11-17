'use strict'
var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (const p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) { t[p] = s[p] }
      }
    }
    return t
  }
  return __assign.apply(this, arguments)
}
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
  function adopt (value) { return value instanceof P ? value : new P(function (resolve) { resolve(value) }) }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled (value) { try { step(generator.next(value)) } catch (e) { reject(e) } }
    function rejected (value) { try { step(generator.throw(value)) } catch (e) { reject(e) } }
    function step (result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected) }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}
const __generator = (this && this.__generator) || function (thisArg, body) {
  let _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1] }, trys: [], ops: [] }; let f; let y; let t; let g
  return g = { next: verb(0), throw: verb(1), return: verb(2) }, typeof Symbol === 'function' && (g[Symbol.iterator] = function () { return this }), g
  function verb (n) { return function (v) { return step([n, v]) } }
  function step (op) {
    if (f) throw new TypeError('Generator is already executing.')
    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y.return : op[0] ? y.throw || ((t = y.return) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t
        if (y = 0, t) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0: case 1: t = op; break
          case 4: _.label++; return { value: op[1], done: false }
          case 5: _.label++; y = op[1]; op = [0]; continue
          case 7: op = _.ops.pop(); _.trys.pop(); continue
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break }
            if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break }
            if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break }
            if (t[2]) _.ops.pop()
            _.trys.pop(); continue
        }
        op = body.call(thisArg, _)
      } catch (e) { op = [6, e]; y = 0 } finally { f = t = 0 }
    }
    if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true }
  }
}
const __rest = (this && this.__rest) || function (s, e) {
  const t = {}
  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) { t[p] = s[p] }
  }
  if (s != null && typeof Object.getOwnPropertySymbols === 'function') {
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) { t[p[i]] = s[p[i]] }
    }
  }
  return t
}
let _a
exports.__esModule = true
exports.requestsActions = exports.requestsSlice = exports.actions = void 0
const toolkit_1 = require('@reduxjs/toolkit')
const RequestService_1 = require('../services/RequestService')
const loader_1 = require('./loader')
const initState = []
exports.actions = (_a = toolkit_1.createSlice({
  name: 'requests',
  initialState: initState,
  reducers: {
    getRequests: function (state, _a) {
      const payload = _a.payload
      return payload
    }
  }
}), _a).actions, exports.requestsSlice = __rest(_a, ['actions'])
const getAllRequests = function (id) {
  return function (dispatch) {
    return __awaiter(void 0, void 0, void 0, function () {
      let res
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            dispatch(loader_1.loaderActions.loading('requestsLoader'))
            return [4 /* yield */, RequestService_1.default.getAllRequests(id)]
          case 1:
            res = _a.sent()
            res && dispatch(exports.actions.getRequests(res))
            dispatch(loader_1.loaderActions.loaded('requestsLoader'))
            return [2]
        }
      })
    })
  }
}
const rejectRequest = function (id, callback) {
  return function (dispatch, getState) {
    return __awaiter(void 0, void 0, void 0, function () {
      let requests, res, data
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            requests = getState().requests
            return [4 /* yield */, RequestService_1.default.rejectRequest(id)]
          case 1:
            res = _a.sent()
            data = res
              ? requests.filter(function (d) { return d.id !== id })
              : requests
            dispatch(exports.actions.getRequests(data))
            callback && callback()
            return [2]
        }
      })
    })
  }
}
const approveRequest = function (id, uri, duration, callback) {
  return function (dispatch, getState) {
    return __awaiter(void 0, void 0, void 0, function () {
      let requests, loading, res, data
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            requests = getState().requests
            loading = function () { return dispatch(loader_1.loaderActions.loading('responseLoader')) }
            return [4 /* yield */, RequestService_1.default
              .approveRequest(id, uri, duration, loading)]
          case 1:
            res = _a.sent()
            if (res) {
              data = requests.map(function (d) {
                if (d.id === id) {
                  return __assign(__assign({}, d), res)
                }
                return d
              })
              dispatch(exports.actions.getRequests(data))
              callback && callback()
            }
            dispatch(loader_1.loaderActions.loaded('responseLoader'))
            return [2]
        }
      })
    })
  }
}
exports.requestsActions = __assign(__assign({}, exports.actions), {
  rejectRequest: rejectRequest,
  getAllRequests: getAllRequests,
  approveRequest: approveRequest
})
