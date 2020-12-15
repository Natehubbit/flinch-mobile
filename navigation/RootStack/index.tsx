import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AppDrawer from '../AppDrawer'
import { Video } from 'expo-av'
import Notifications from '../../screens/Notifications'
import Search from '../../screens/Search'
import WebViewScreen from '../../screens/WebView'
import { useDispatch } from 'react-redux'
import { notificationsActions } from '../../store/notifications'

const Stack = createStackNavigator()

const RootStack = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(notificationsActions.getDeviceToken())
  }, [])
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
