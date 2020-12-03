import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import Navbar from '../../components/Navbar'
import { RouteParams } from '..'
import Profile from '../../screens/Profile'

const Stack = createStackNavigator<RouteParams>()

const ProfileStack = () => {
  const renderHeader = (props:StackHeaderProps) => {
    const { scene: { route: { name } } } = props
    return <Navbar title={name}/>
  }

  return (
    <Stack.Navigator
      screenOptions={{
        header: props => renderHeader(props)
      }}
    >
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}

export default ProfileStack
