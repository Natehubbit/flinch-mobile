'use strict'
exports.__esModule = true
const stack_1 = require('@react-navigation/stack')
const react_1 = require('react')
const Navbar_1 = require('../../components/Navbar')
const useUser_1 = require('../../hooks/useUser')
const Request_1 = require('../../screens/Request')
const Requests_1 = require('../../screens/Requests')
const VideoRecord_1 = require('../../screens/VideoRecord')
const VideoUpload_1 = require('../../screens/VideoUpload')
const RequestsTabs_1 = require('../RequestsTabs')
const Stack = stack_1.createStackNavigator()
const RequestStack = function () {
  const role = useUser_1.useUser().role
  const renderRequests = function () {
    return role === 'celebrity'
      ? RequestsTabs_1.default
      : Requests_1.default
  }
  const renderHeader = function (props) {
    const name = props.scene.route.name
    const heading = name === 'VideoUpload'
      ? 'Upload Video'
      : name
    const show = name === 'RecordVideo'
    return !show ? react_1.default.createElement(Navbar_1.default, { title: heading }) : null
  }
  return react_1.default.createElement(Stack.Navigator, {
    screenOptions: {
      header: function (props) { return renderHeader(props) }
    }
  },
  react_1.default.createElement(Stack.Screen, { name: 'Requests', component: renderRequests() }),
  react_1.default.createElement(Stack.Screen, { name: 'Request', component: Request_1.default }),
  react_1.default.createElement(Stack.Screen, { name: 'VideoUpload', component: VideoUpload_1.default }),
  react_1.default.createElement(Stack.Screen, { name: 'RecordVideo', component: VideoRecord_1.default }))
}
exports.default = RequestStack
