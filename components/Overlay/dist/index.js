'use strict'
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
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var react_native_paper_1 = require('react-native-paper')
// import { useDispatch } from 'react-redux'
var styledComponents_1 = require('../../common/styledComponents')
var theme_1 = require('../../config/theme')
var selector_1 = require('../../hooks/selector')
var useLoader_1 = require('../../hooks/useLoader')
// import UploadHookService from '../../services/UploadHookService'
// import { loaderActions } from '../../store/loader'
// import { toastActions } from '../../store/toast'
var Selector_1 = require('../Selector')
var Toast_1 = require('../Toast')
var UploadModal_1 = require('../UploadModal')
var AppOverlay = function (_a) {
  var children = _a.children,
    props = __rest(_a, ['children'])
  // const dispatch = useDispatch()
  var _b = useLoader_1.useLoader(),
    paymentLoader = _b.paymentLoader.isLoading,
    responseLoader = _b.responseLoader.isLoading,
    authLoader = _b.authLoader.isLoading
  var showSelector = selector_1.useSelect().show
  var loading =
    paymentLoader ||
    responseLoader ||
    authLoader ||
    showSelector
  react_1.useEffect(
    function () {
      loading
        ? react_native_1.BackHandler.addEventListener(
            'hardwareBackPress',
            onExit
          )
        : react_native_1.BackHandler.removeEventListener(
            'hardwareBackPress',
            onExit
          )
      return function () {
        return react_native_1.BackHandler.removeEventListener(
          'hardwareBackPress',
          onExit
        )
      }
    },
    [loading]
  )
  var onExit = function () {
    if (loading) {
      react_native_1.Alert.alert(
        'Exit?',
        'Are you sure you want to exit Flinch?',
        [
          {
            text: 'Yes',
            onPress: function () {
              return react_native_1.BackHandler.exitApp()
            }
          },
          {
            text: 'No',
            style: 'cancel'
          }
        ]
      )
    }
    return true
  }
  var renderSubmitting = function () {
    return react_1['default'].createElement(
      react_native_1.View,
      { style: [styles.submitting] },
      react_1['default'].createElement(
        react_native_1.View,
        { style: [styles.submittingContent] },
        react_1['default'].createElement(
          react_native_paper_1.ActivityIndicator,
          {
            color: theme_1.theme.colors.primary,
            style: [styles.submitLoader]
          }
        ),
        react_1['default'].createElement(
          styledComponents_1.Paragraph,
          { black: true },
          'Submitting '
        )
      )
    )
  }
  var renderLoader = function () {
    return react_1['default'].createElement(
      react_native_paper_1.ActivityIndicator,
      {
        animating: true,
        size: 'large',
        color: theme_1.theme.colors.primary
      }
    )
  }
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    children,
    loading &&
      react_1['default'].createElement(
        react_native_1.View,
        { style: styles.container },
        paymentLoader && renderLoader(),
        responseLoader &&
          react_1['default'].createElement(
            UploadModal_1['default'],
            null
          ),
        authLoader && renderSubmitting(),
        react_1['default'].createElement(
          Selector_1['default'],
          null
        )
      ),
    react_1['default'].createElement(
      Toast_1['default'],
      null
    )
  )
}
exports['default'] = AppOverlay
var styles = react_native_1.StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  submitLoader: {
    marginRight: 10
  },
  submitting: {
    height: '25%',
    width: '70%',
    backgroundColor: theme_1.COLORS.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  submittingContent: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
