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
exports.__esModule = true
const react_1 = require('react')
const drawer_1 = require('@react-navigation/drawer')
const HomeStack_1 = require('../HomeStack')
const RequestStack_1 = require('../RequestStack')
const Drawer_1 = require('../../components/Drawer')
const stack_1 = require('@react-navigation/stack')
const WebView_1 = require('../../screens/WebView')
const Drawer = drawer_1.createDrawerNavigator()
const AppDrawer = function () {
  return (react_1.default.createElement(Drawer.Navigator, {
    drawerContent: function (props) { return react_1.default.createElement(Drawer_1.default, __assign({}, props)) },
    initialRouteName: 'Home',
    screenOptions: {
      header: function () { return null }
    }
  },
  react_1.default.createElement(Drawer.Screen, { name: 'Home', component: HomeStack_1.default }),
  react_1.default.createElement(Drawer.Screen, { name: 'Profile', component: HomeStack_1.default }),
  react_1.default.createElement(Drawer.Screen, { name: 'Notifications', component: HomeStack_1.default }),
  react_1.default.createElement(Drawer.Screen, { name: 'Requests', component: RequestStack_1.default })))
}
const Stack = stack_1.createStackNavigator()
const AppDrawerRoot = function () {
  return (react_1.default.createElement(Stack.Navigator, { mode: 'modal', headerMode: 'none' },
    react_1.default.createElement(Stack.Screen, { name: 'Home', component: AppDrawer }),
    react_1.default.createElement(Stack.Screen, { name: 'WebView', component: WebView_1.default })))
}
exports.default = AppDrawerRoot
