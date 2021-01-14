'use strict'
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var theme_1 = require('../../config/theme')
var LabelTag = function () {
  return react_1['default'].createElement(
    react_native_1.View,
    { style: [styles.container] },
    react_1['default'].createElement(
      react_native_1.Text,
      { style: [styles.label] },
      'Wedding'
    )
  )
}
exports['default'] = LabelTag
var styles = react_native_1.StyleSheet.create({
  container: {
    padding: 3,
    borderRadius: 100,
    backgroundColor: theme_1.theme.colors.primary,
    marginVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: 70
  },
  label: {
    fontSize: 10,
    fontFamily: 'Karla-Regular',
    color: 'white'
  }
})
