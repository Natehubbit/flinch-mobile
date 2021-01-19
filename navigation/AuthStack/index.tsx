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
import { SLIDE_ANIMATION } from '../../common/constants'
import ForgotPass from '../../screens/ForgotPassword'

const Stack = createStackNavigator<RouteParams>()

const AuthStack = () => {
  return (
    <Stack.Navigator
      headerMode='none'
      screenOptions={{
        ...SLIDE_ANIMATION
      }}>
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
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPass}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
