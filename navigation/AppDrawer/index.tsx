import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from '../HomeStack'
import RequestStack from '../RequestStack'
import DrawerComponent from '../../components/Drawer'
import { createStackNavigator } from '@react-navigation/stack'
import WebViewScreen from '../../screens/WebView'

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
            <Drawer.Screen name="Profile" component={HomeStack} />
            <Drawer.Screen name="Notifications" component={HomeStack} />
            <Drawer.Screen name="Requests" component={RequestStack} />
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
        </Stack.Navigator>
  )
}

export default AppDrawerRoot
