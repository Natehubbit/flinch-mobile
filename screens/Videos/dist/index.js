'use strict'
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var react_native_paper_1 = require('react-native-paper')
var react_redux_1 = require('react-redux')
var VideoCard_1 = require('../../components/VideoCard')
var theme_1 = require('../../config/theme')
var useLoader_1 = require('../../hooks/useLoader')
var useResponse_1 = require('../../hooks/useResponse')
var useUser_1 = require('../../hooks/useUser')
var HelperService_1 = require('../../services/HelperService')
var response_1 = require('../../store/response')
function Videos() {
  var dispatch = react_redux_1.useDispatch()
  var _a = react_1.useState(false),
    refreshing = _a[0],
    setRefreshing = _a[1]
  var data = useResponse_1.useResponse('approved')
  var dataExists = data.length > 0
  var id = useUser_1.useUser().id
  var loader = useLoader_1.useLoader()
    .videosResponseLoader.isLoading
  react_1.useEffect(function () {
    dataExists
      ? onReload()
      : dispatch(
          response_1.responseActions.getApproved(
            id
          )
        )
  }, [])
  var onReload = function () {
    setRefreshing(true)
    var endRefresh = function () {
      return setRefreshing(false)
    }
    dispatch(
      response_1.responseActions.reloadApproved(
        id,
        endRefresh
      )
    )
  }
  return react_1['default'].createElement(
    react_native_1.View,
    { style: [styles.container] },
    loader
      ? react_1['default'].createElement(
          react_native_paper_1.ActivityIndicator,
          null
        )
      : react_1['default'].createElement(
          react_native_1.FlatList,
          {
            data: data,
            refreshControl: react_1[
              'default'
            ].createElement(
              react_native_1.RefreshControl,
              {
                onRefresh: onReload,
                refreshing: refreshing,
                colors: [
                  theme_1.theme.colors.primary
                ]
              }
            ),
            renderItem: function (_a) {
              var item = _a.item
              return react_1[
                'default'
              ].createElement(
                VideoCard_1['default'],
                {
                  uri: item.videoUri,
                  duration: 0,
                  celebrity: item.celebrity,
                  date: HelperService_1[
                    'default'
                  ].parseToDate(item.timestamp),
                  id: item.id,
                  recipient: item.recipient,
                  thumbnailUri: item.thumbnailUri
                }
              )
            },
            keyExtractor: function (item) {
              return item.id
            },
            numColumns: 2
          }
        )
  )
}
exports['default'] = Videos
var styles = react_native_1.StyleSheet.create({
  container: {
    flex: 1
  }
})
