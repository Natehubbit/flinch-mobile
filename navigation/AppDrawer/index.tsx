import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from '../HomeStack'
import RequestStack from '../RequestStack'
import DrawerComponent from '../../components/Drawer'
import { createStackNavigator } from '@react-navigation/stack'
import WebViewScreen from '../../screens/WebView'
import VideoStack from '../VideoStack'
import Video from '../../screens/Video'
import Notifications from '../../screens/Notifications'
import ProfileStack from '../ProfileStack'
import Search from '../../screens/Search'

const Drawer = createDrawerNavigator()
const AppDrawer = () => {
  return (
        <Drawer.Navigator
            drawerContent={props => <DrawerComponent {...props}/>}
            initialRouteName="Home"
            screenOptions={{
              header: () => null
            }}>
            <Drawer.Screen name="Home" component={HomeStack} />
            <Drawer.Screen name="Profile" component={ProfileStack} />
            <Drawer.Screen name="Notifications" component={Notifications} />
            <Drawer.Screen name="Requests" component={RequestStack} />
            <Drawer.Screen name="Videos" component={VideoStack} />
        </Drawer.Navigator>
  )
}

const Stack = createStackNavigator()
const AppDrawerRoot = () => {
  return (
        <Stack.Navigator
            mode='modal'
            headerMode='none'
        >
            <Stack.Screen name="Home" component={AppDrawer} />
            <Stack.Screen name='WebView' component={WebViewScreen}/>
            <Stack.Screen name="Video" component={Video} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name='Search' component={Search} />
        </Stack.Navigator>
  )
}

export default AppDrawerRoot
