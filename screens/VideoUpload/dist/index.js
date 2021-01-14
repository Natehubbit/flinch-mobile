'use strict'
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
exports.__esModule = true
var native_1 = require('@react-navigation/native')
var expo_av_1 = require('expo-av')
var expo_camera_1 = require('expo-camera')
var react_1 = require('react')
var react_native_1 = require('react-native')
var react_redux_1 = require('react-redux')
var videoBack_svg_1 = require('../../assets/images/videoBack.svg')
var ButtonAction_1 = require('../../components/ButtonAction')
var HelperService_1 = require('../../services/HelperService')
var requests_1 = require('../../store/requests')
// import { toastActions } from '../../store/toast'
var MediaLibrary = require('expo-media-library')
var Navbar_1 = require('../../components/Navbar')
var VideoUpload = function (_a) {
  var navigation = _a.navigation
  var dispatch = react_redux_1.useDispatch()
  // const toast = useToast()
  var _b = react_1.useState(''),
    videoUri = _b[0],
    setVideoUri = _b[1]
  var id = native_1.useRoute().params.id
  var navigate = native_1.useNavigation().navigate
  react_1.useEffect(
    function () {
      !!videoUri && onSend()
    },
    [videoUri]
  )
  var onReset = function () {
    navigation.popToTop()
  }
  var onUploadVideo = function () {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                HelperService_1[
                  'default'
                ].uploadVideo(setVideoUri)
              ]
            case 1:
              _a.sent()
              return [2 /*return*/]
          }
        })
      }
    )
  }
  var onRecordVideo = function () {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        var allowed
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                requestPermission()
              ]
            case 1:
              allowed = _a.sent()
              allowed &&
                navigate('RecordVideo', {
                  id: id
                })
              return [2 /*return*/]
          }
        })
      }
    )
  }
  var onSend = function () {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        return __generator(this, function (_a) {
          // dispatch(toastActions.setToast({
          //   ...toast,
          //   show: false,
          //   onPress: send
          // }))
          send()
          return [2 /*return*/]
        })
      }
    )
  }
  var send = function () {
    dispatch(
      requests_1.requestsActions.approveRequest(
        id,
        videoUri,
        onReset
      )
    )
  }
  var requestPermission = function () {
    return __awaiter(
      void 0,
      void 0,
      void 0,
      function () {
        var mediaPerm, videoPerm, audioPerm
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [
                4 /*yield*/,
                MediaLibrary.requestPermissionsAsync()
              ]
            case 1:
              mediaPerm = _a.sent().status
              return [
                4 /*yield*/,
                expo_camera_1.Camera.requestPermissionsAsync()
              ]
            case 2:
              videoPerm = _a.sent().status
              return [
                4 /*yield*/,
                expo_av_1.Audio.requestPermissionsAsync()
              ]
            case 3:
              audioPerm = _a.sent().status
              return [
                2 /*return*/,
                videoPerm === 'granted' &&
                  audioPerm === 'granted' &&
                  mediaPerm === 'granted'
              ]
          }
        })
      }
    )
  }
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      Navbar_1['default'],
      {
        title: 'Upload Video',
        hideBell: true
      }
    ),
    react_1['default'].createElement(
      react_native_1.View,
      { style: styles.container },
      react_1['default'].createElement(
        videoBack_svg_1['default'],
        null
      ),
      react_1['default'].createElement(
        react_native_1.View,
        { style: styles.content },
        react_1['default'].createElement(
          ButtonAction_1['default'],
          {
            icon: 'video-plus',
            label: 'Record Video',
            onPress: onRecordVideo
          }
        ),
        react_1['default'].createElement(
          ButtonAction_1['default'],
          {
            onPress: onUploadVideo,
            icon: 'cloud-upload',
            label: 'Upload Video'
          }
        )
      )
    )
  )
}
var styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  content: {
    width: '100%',
    paddingVertical: 50,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})
// make this component available to the app
exports['default'] = VideoUpload
