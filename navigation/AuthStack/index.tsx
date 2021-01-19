import 'react-native-gesture-handler'
import React from 'react'
import {
  createStackNavigator
} from '@react-navigation/stack'
import Login from '../../screens/Login'
import Signup from '../../screens/Signup'
import Signup2 from '../../screens/Signup2'
import { RouteParams } from '..'
import Welcome from '../../screens/Welcome'

const Stack = createStackNavigator<RouteParams>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode='none'>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
        <Stack.Screen
          name="Login"
          component={Login}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
      <Stack.Screen
        name="Signup2"
        component={Signup2}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
