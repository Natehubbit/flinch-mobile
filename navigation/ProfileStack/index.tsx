import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RouteParams } from '..'
import Profile from '../../screens/Profile'
import { SLIDE_ANIMATION } from '../../common/constants'

const Stack = createStackNavigator<RouteParams>()

const ProfileStack = () => {
  // const renderHeader = (props:StackHeaderProps) => {
  //   const { scene: { route: { name } } } = props
  //   return <Navbar title={name} hideBell/>
  // }

  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
        ...SLIDE_ANIMATION
      }}
    >
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}

export default ProfileStack
