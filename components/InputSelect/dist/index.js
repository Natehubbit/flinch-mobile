'use strict'
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var styledComponents_1 = require('../../common/styledComponents')
var theme_1 = require('../../config/theme')
var vector_icons_1 = require('@expo/vector-icons')
var react_native_paper_1 = require('react-native-paper')
var react_redux_1 = require('react-redux')
var selector_1 = require('../../store/selector')
var selector_2 = require('../../hooks/selector')
var InputSelect = function (_a) {
  var placeholder = _a.placeholder,
    right = _a.right,
    val = _a.value,
    onChange = _a.onChange,
    field = _a.field,
    options = _a.options
  react_1.useEffect(function () {
    val &&
      dispatch(
        selector_1.selectorActions.setSelector({
          value: val
        })
      )
  }, [])
  var dispatch = react_redux_1.useDispatch()
  var value = selector_2.useSelect().value
  react_1.useEffect(
    function () {
      onChange && onChange(field, value)
    },
    [value]
  )
  var onPress = function () {
    dispatch(
      selector_1.selectorActions.openSelector(
        options,
        'Choose an Ocassion'
      )
    )
  }
  var hasVal = !!value
  return react_1['default'].createElement(
    react_native_paper_1.TouchableRipple,
    { style: [styles.input], onPress: onPress },
    react_1['default'].createElement(
      react_1['default'].Fragment,
      null,
      react_1['default'].createElement(
        react_native_1.View,
        { style: [styles.icon] },
        react_1['default'].createElement(
          vector_icons_1.MaterialCommunityIcons,
          {
            name: 'calendar-outline',
            size: 24,
            color: theme_1.COLORS.iconGrey
          }
        )
      ),
      react_1['default'].createElement(
        react_native_1.View,
        { style: [styles.label] },
        !hasVal &&
          react_1['default'].createElement(
            styledComponents_1.Paragraph,
            { style: [styles.txt], black: true },
            placeholder
          ),
        hasVal &&
          react_1['default'].createElement(
            styledComponents_1.Paragraph,
            { style: [styles.val], black: true },
            value
          )
      ),
      react_1['default'].createElement(
        react_native_1.View,
        { style: [styles.icon] },
        react_1['default'].createElement(
          vector_icons_1.MaterialCommunityIcons,
          {
            name: right,
            size: 24,
            color: theme_1.COLORS.iconGrey
          }
        )
      )
    )
  )
}
exports['default'] = InputSelect
var styles = react_native_1.StyleSheet.create({
  input: {
    marginTop: 20,
    height: 54,
    backgroundColor: theme_1.COLORS.lightPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme_1.COLORS.light2,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  },
  label: {
    flex: 8
  },
  icon: {
    flex: 2,
    alignItems: 'center'
  },
  txt: {
    fontSize: 16,
    color: theme_1.COLORS.iconGrey
  },
  val: {
    fontSize: 16
  }
})
