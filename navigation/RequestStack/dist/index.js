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
var stack_1 = require('@react-navigation/stack')
var react_1 = require('react')
var constants_1 = require('../../common/constants')
var Navbar_1 = require('../../components/Navbar')
// import VideoRecord from '../../screens/VideoRecord'
// import VideoUpload from '../../screens/VideoUpload'
var RequestsTabs_1 = require('../RequestsTabs')
var Stack = stack_1.createStackNavigator()
var RequestStack = function () {
  var renderHeader = function (props) {
    var name = props.scene.route.name
    var heading =
      name === 'VideoUpload'
        ? 'Upload Video'
        : name
    var show = name === 'RecordVideo'
    return !show
      ? react_1['default'].createElement(
          Navbar_1['default'],
          {
            title: heading,
            hideBell: true
          }
        )
      : null
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
        name: 'Requests',
        component: RequestsTabs_1['default']
      }
    )
  )
}
exports['default'] = RequestStack
