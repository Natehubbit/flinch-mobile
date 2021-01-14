'use strict'
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var react_native_paper_1 = require('react-native-paper')
var styledComponents_1 = require('../../common/styledComponents')
var ModalLoader = function (props) {
  var show = props.show,
    label = props.label
  return react_1['default'].createElement(
    react_native_paper_1.Portal,
    null,
    react_1['default'].createElement(
      react_native_paper_1.Dialog,
      { visible: show },
      react_1['default'].createElement(
        react_native_paper_1.Dialog.Content,
        null,
        react_1['default'].createElement(
          styledComponents_1.Paragraph,
          { black: true, style: styles.text },
          (label || '') + '\n'
        ),
        react_1[
          'default'
        ].createElement(
          react_native_paper_1.ActivityIndicator,
          { animating: true }
        )
      )
    )
  )
}
var styles = react_native_1.StyleSheet.create({
  text: {
    textAlign: 'center'
  }
})
exports['default'] = ModalLoader
