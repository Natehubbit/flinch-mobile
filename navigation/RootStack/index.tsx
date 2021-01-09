import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppDrawer from '../AppDrawer'
import Notifications from '../../screens/Notifications'
import Search from '../../screens/Search'
import WebViewScreen from '../../screens/WebView'
import Video from '../../screens/Video'

const Stack = createStackNavigator()

const RootStack = () => {
  return (
        <Stack.Navigator
          mode='modal'
          headerMode='none'>
          <Stack.Screen name="Home" component={AppDrawer} />
          <Stack.Screen name='WebView' component={WebViewScreen}/>
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
  )
}

export default RootStack
