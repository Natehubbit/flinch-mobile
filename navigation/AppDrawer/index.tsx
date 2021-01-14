import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeStack from '../HomeStack'
import RequestStack from '../RequestStack'
import DrawerComponent from '../../components/Drawer'
import VideoStack from '../VideoStack'
import Notifications from '../../screens/Notifications'
import ProfileStack from '../ProfileStack'
import { useUser } from '../../hooks/useUser'
import CelebHome from '../../screens/CelebHome'

const Drawer = createDrawerNavigator()

const AppDrawer = () => {
  const { role } = useUser()
  const Home =
    role === 'celebrity' ? CelebHome : HomeStack
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerComponent {...props} />
      )}
      initialRouteName="Home"
      screenOptions={{
        header: () => null
      }}>
      <Drawer.Screen
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
      />
      <Drawer.Screen
        name="Requests"
        component={RequestStack}
      />
      <Drawer.Screen
        name="Videos"
        component={VideoStack}
      />
    </Drawer.Navigator>
  )
}

export default AppDrawer
