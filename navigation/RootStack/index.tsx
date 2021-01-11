import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppDrawer from '../AppDrawer'
import Notifications from '../../screens/Notifications'
import Search from '../../screens/Search'
import WebViewScreen from '../../screens/WebView'
import Video from '../../screens/Video'
import useNotifications from '../../hooks/useNotifications'
import Request from '../../screens/Request'

const Stack = createStackNavigator()

const RootStack = () => {
  useNotifications()
  return (
    <Stack.Navigator
      mode='modal'
      headerMode='none'>
      <Stack.Screen name="Home" component={AppDrawer} />
      <Stack.Screen name='WebView' component={WebViewScreen}/>
      <Stack.Screen name="Video" component={Video} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name='Search' component={Search} />
      <Stack.Screen name='Request' component={Request} />
    </Stack.Navigator>
  )
}

export default RootStack
