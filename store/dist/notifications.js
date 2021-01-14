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
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value)
          })
    }
    return new (P || (P = Promise))(function (
      resolve,
      reject
    ) {
      function fulfilled(value) {
        try {
          step(generator.next(value))
        } catch (e) {
          reject(e)
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value))
        } catch (e) {
          reject(e)
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(
              fulfilled,
              rejected
            )
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      )
    })
  }
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1]
          return t[1]
        },
        trys: [],
        ops: []
      },
      f,
      y,
      t,
      g
    return (
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2)
      }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this
        }),
      g
    )
    function verb(n) {
      return function (v) {
        return step([n, v])
      }
    }
    function step(op) {
      if (f)
        throw new TypeError(
          'Generator is already executing.'
        )
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] ||
                    ((t = y['return']) &&
                      t.call(y),
                    0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t
          if (((y = 0), t))
            op = [op[0] & 2, t.value]
          switch (op[0]) {
            case 0:
            case 1:
              t = op
              break
            case 4:
              _.label++
              return {
                value: op[1],
                done: false
              }
            case 5:
              _.label++
              y = op[1]
              op = [0]
              continue
            case 7:
              op = _.ops.pop()
              _.trys.pop()
              continue
            default:
              if (
                !((t = _.trys),
                (t =
                  t.length > 0 &&
                  t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0
                continue
              }
              if (
                op[0] === 3 &&
                (!t ||
                  (op[1] > t[0] && op[1] < t[3]))
              ) {
                _.label = op[1]
                break
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1]
                t = op
                break
              }
              if (t && _.label < t[2]) {
                _.label = t[2]
                _.ops.push(op)
                break
              }
              if (t[2]) _.ops.pop()
              _.trys.pop()
              continue
          }
          op = body.call(thisArg, _)
        } catch (e) {
          op = [6, e]
          y = 0
        } finally {
          f = t = 0
        }
      if (op[0] & 5) throw op[1]
      return {
        value: op[0] ? op[1] : void 0,
        done: true
      }
    }
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
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (
      var s = 0, i = 0, il = arguments.length;
      i < il;
      i++
    )
      s += arguments[i].length
    for (
      var r = Array(s), k = 0, i = 0;
      i < il;
      i++
    )
      for (
        var a = arguments[i],
          j = 0,
          jl = a.length;
        j < jl;
        j++, k++
      )
        r[k] = a[j]
    return r
  }
var _a
exports.__esModule = true
exports.notificationsActions = exports.notificationsSlice = exports.actions = void 0
var toolkit_1 = require('@reduxjs/toolkit')
var CelebService_1 = require('../services/CelebService')
var NotificationService_1 = require('../services/NotificationService')
var UserService_1 = require('../services/UserService')
var loader_1 = require('./loader')
var user_1 = require('./user')
var initState = []
;(exports.actions = ((_a = toolkit_1.createSlice({
  name: 'notifications',
  initialState: initState,
  reducers: {
    getNotifications: function (state, _a) {
      var payload = _a.payload
      return payload
    },
    update: function (state, _a) {
      var payload = _a.payload
      return __spreadArrays(state, [payload])
    },
    clearNotifications: function () {
      return initState
    }
  }
})),
_a).actions),
  (exports.notificationsSlice = __rest(_a, [
    'actions'
  ]))
var getDeviceToken = function () {
  return function (dispatch, getState) {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        var _a,
          id,
          token,
          _b,
          isCeleb,
          celebId,
          tkn,
          usr,
          updatedCeleb,
          updatedUser
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              ;(_a = getState().user),
                (id = _a.id),
                (token = _a.token),
                (_b = _a.celebrity),
                (isCeleb = _b.isCeleb),
                (celebId = _b.id)
              if (!!token) return [3 /*break*/, 5]
              return [
                4 /*yield*/,
                NotificationService_1[
                  'default'
                ].getToken()
              ]
            case 1:
              tkn = _c.sent()
              if (!isCeleb)
                return [3 /*break*/, 3]
              usr = getState().user
              return [
                4 /*yield*/,
                CelebService_1[
                  'default'
                ].updateCeleb({
                  id: celebId,
                  token: tkn
                })
              ]
            case 2:
              updatedCeleb = _c.sent()
              updatedCeleb &&
                dispatch(
                  user_1.userActions.updateProfile(
                    {
                      id: id,
                      celebrity: __assign(
                        __assign(
                          {},
                          usr.celebrity
                        ),
                        {
                          data: __assign(
                            __assign(
                              {},
                              usr.celebrity.data
                            ),
                            {
                              token: tkn
                            }
                          )
                        }
                      )
                    }
                  )
                )
              return [3 /*break*/, 5]
            case 3:
              return [
                4 /*yield*/,
                UserService_1['default'].update({
                  id: id,
                  token: tkn
                })
              ]
            case 4:
              updatedUser = _c.sent()
              updatedUser &&
                dispatch(
                  user_1.userActions.updateProfile(
                    {
                      id: id,
                      token: tkn
                    }
                  )
                )
              _c.label = 5
            case 5:
              return [2 /*return*/]
          }
        })
      }
    )
  }
}
var getNotifications = function () {
  return function (dispatch, getState) {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        var _a,
          userId,
          role,
          celebrity,
          isUser,
          id,
          data
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              dispatch(
                loader_1.loaderActions.loading(
                  'requestsLoader'
                )
              )
              ;(_a = getState().user),
                (userId = _a.id),
                (role = _a.role),
                (celebrity = _a.celebrity)
              isUser = role === 'user'
              id = isUser ? userId : celebrity.id
              return [
                4 /*yield*/,
                NotificationService_1[
                  'default'
                ].getNotifications(id)
              ]
            case 1:
              data = _b.sent()
              data &&
                dispatch(
                  exports.actions.getNotifications(
                    data
                  )
                )
              dispatch(
                loader_1.loaderActions.loaded(
                  'requestsLoader'
                )
              )
              return [2 /*return*/]
          }
        })
      }
    )
  }
}
var listen = function (data) {
  return function (dispatch) {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        return __generator(this, function (_a) {
          dispatch(
            exports.actions.getNotifications(data)
          )
          return [2 /*return*/]
        })
      }
    )
  }
}
var update = function (id, data) {
  return function (dispatch, getState) {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        var notifications, updated, updatedList
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              notifications = getState()
                .notifications
              return [
                4 /*yield*/,
                NotificationService_1[
                  'default'
                ].updateNotification(id, data)
              ]
            case 1:
              updated = _a.sent()
              if (updated) {
                updatedList = notifications.map(
                  function (d) {
                    if (d.id === id) {
                      return __assign(
                        __assign({}, d),
                        data
                      )
                    }
                    return d
                  }
                )
                dispatch(
                  exports.actions.getNotifications(
                    updatedList
                  )
                )
              }
              return [2 /*return*/]
          }
        })
      }
    )
  }
}
exports.notificationsActions = __assign(
  __assign({}, exports.actions),
  {
    getDeviceToken: getDeviceToken,
    getNotifications: getNotifications,
    listen: listen,
    update: update
  }
)
