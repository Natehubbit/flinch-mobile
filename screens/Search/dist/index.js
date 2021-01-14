'use strict'
exports.__esModule = true
var native_1 = require('@react-navigation/native')
var react_1 = require('react')
var react_instantsearch_core_1 = require('react-instantsearch-core')
var react_native_1 = require('react-native')
var react_native_paper_1 = require('react-native-paper')
var SearchBox_1 = require('../../components/SearchBox')
var SearchHits_1 = require('../../components/SearchHits')
var SearchService_1 = require('../../services/SearchService')
var Search = function () {
  var _a = native_1.useNavigation(),
    goBack = _a.goBack,
    navigate = _a.navigate
  var onClose = function () {
    return goBack()
  }
  var onPress = function (data) {
    navigate('Celeb', { data: data })
  }
  return react_1['default'].createElement(
    react_native_1.View,
    { style: styles.container },
    react_1['default'].createElement(
      react_instantsearch_core_1.InstantSearch,
      {
        searchClient:
          SearchService_1['default'].searchClient,
        indexName: 'celebs'
      },
      react_1['default'].createElement(
        SearchBox_1['default'],
        null
      ),
      react_1['default'].createElement(
        SearchHits_1['default'],
        {
          onPress: onPress
        }
      )
    ),
    react_1['default'].createElement(
      react_native_paper_1.FAB,
      {
        icon: 'close',
        style: styles.fab,
        onPress: onClose
      }
    )
  )
}
var styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    bottom: 12,
    right: 12
  },
  content: {
    // paddingHorizontal: 17
  },
  search: {}
})
exports['default'] = Search
