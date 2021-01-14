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
exports.__esModule = true
require('react-native-gesture-handler')
var react_1 = require('react')
var stack_1 = require('@react-navigation/stack')
var Navbar_1 = require('../../components/Navbar')
var Videos_1 = require('../../screens/Videos')
var constants_1 = require('../../common/constants')
var Stack = stack_1.createStackNavigator()
var VideoStack = function () {
  var renderHeader = function (props) {
    var name = props.scene.route.name
    return react_1['default'].createElement(
      Navbar_1['default'],
      {
        title: name,
        hideBell: true
      }
    )
  }
  return react_1['default'].createElement(
    Stack.Navigator,
    {
      screenOptions: __assign(
        {
          header: function (props) {
            return renderHeader(props)
          }
        },
        constants_1.SLIDE_ANIMATION
      )
    },
    react_1['default'].createElement(
      Stack.Screen,
      {
        name: 'Videos',
        component: Videos_1['default']
      }
    )
  )
}
exports['default'] = VideoStack
