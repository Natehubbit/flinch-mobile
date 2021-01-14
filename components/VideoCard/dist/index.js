'use strict'
exports.__esModule = true
var react_1 = require('react')
var react_native_1 = require('react-native')
var styledComponents_1 = require('../../common/styledComponents')
var theme_1 = require('../../config/theme')
var vector_icons_1 = require('@expo/vector-icons')
var native_1 = require('@react-navigation/native')
var expo_linear_gradient_1 = require('expo-linear-gradient')
var react_native_gesture_handler_1 = require('react-native-gesture-handler')
var VideoCard = function (_a) {
  var id = _a.id,
    celebrity = _a.celebrity,
    date = _a.date,
    recipient = _a.recipient,
    thumbnailUri = _a.thumbnailUri,
    duration = _a.duration,
    uri = _a.uri
  var navigate = native_1.useNavigation().navigate
  var onOpen = function () {
    var params = {
      duration: duration,
      id: id,
      name: celebrity,
      recipient: recipient,
      date: date,
      uri: uri
    }
    navigate('Video', params)
  }
  return react_1['default'].createElement(
    react_native_1.View,
    { style: [styles.container] },
    react_1['default'].createElement(
      react_native_gesture_handler_1.TouchableOpacity,
      { style: [styles.touch], onPress: onOpen },
      react_1['default'].createElement(
        expo_linear_gradient_1.LinearGradient,
        {
          colors: [
            'transparent',
            'rgba(0,0,0,0.6)'
          ],
          style: [styles.content]
        },
        react_1['default'].createElement(
          react_native_1.ImageBackground,
          {
            source: { uri: thumbnailUri },
            style: [styles.img]
          }
        ),
        react_1['default'].createElement(
          react_native_1.View,
          { style: [styles.infoContainer] },
          react_1['default'].createElement(
            react_native_1.View,
            { style: [styles.info] },
            react_1['default'].createElement(
              styledComponents_1.AltMiniLabel,
              {
                numberOfLines: 3,
                style: [styles.celeb]
              },
              celebrity
            ),
            react_1['default'].createElement(
              react_native_1.View,
              { style: [styles.labelContainer] },
              react_1['default'].createElement(
                react_native_1.View,
                { style: [styles.label] },
                react_1['default'].createElement(
                  vector_icons_1.MaterialCommunityIcons,
                  {
                    size: 10,
                    name: 'account-outline',
                    color: theme_1.COLORS.white
                  }
                ),
                react_1['default'].createElement(
                  styledComponents_1.Paragraph,
                  {
                    style: [styles.mini],
                    numberOfLines: 1
                  },
                  recipient
                )
              ),
              react_1['default'].createElement(
                react_native_1.View,
                { style: [styles.label] },
                react_1['default'].createElement(
                  vector_icons_1.MaterialCommunityIcons,
                  {
                    size: 10,
                    name: 'calendar-outline',
                    color: theme_1.COLORS.white
                  }
                ),
                react_1['default'].createElement(
                  styledComponents_1.Paragraph,
                  {
                    style: [styles.mini],
                    numberOfLines: 1
                  },
                  date
                )
              )
            )
          )
        )
      )
    )
  )
}
exports['default'] = VideoCard
var styles = react_native_1.StyleSheet.create({
  container: {
    height: styledComponents_1.maxHeight * 0.3,
    backgroundColor: theme_1.COLORS.white,
    width: '50%',
    borderWidth: 1,
    borderColor: theme_1.COLORS.white
  },
  touch: {
    height: '100%'
  },
  img: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1
  },
  content: {
    flex: 1
  },
  fab: {
    position: 'absolute',
    right: 15,
    top: -20,
    elevation: 0
  },
  info: {
    paddingLeft: 15,
    paddingVertical: 10,
    justifyContent: 'flex-end',
    flex: 1,
    paddingBottom: 10,
    paddingHorizontal: 5
  },
  infoContainer: {
    flex: 1
  },
  celeb: {
    color: theme_1.COLORS.white
  },
  icon: {
    marginRight: 2,
    fontSize: 15
  },
  labelContainer: {
    justifyContent: 'space-between'
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center'
    // fontSize: 5
  },
  mini: {
    fontSize: 10,
    marginLeft: 5
  }
})
