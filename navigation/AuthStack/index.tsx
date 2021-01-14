import 'react-native-gesture-handler'
import React from 'react'
import {
  createStackNavigator,
  StackHeaderProps
} from '@react-navigation/stack'
import Login from '../../screens/Login'
import Signup from '../../screens/Signup'
import Signup2 from '../../screens/Signup2'
import { useUser } from '../../hooks/useUser'
import Navbar from '../../components/Navbar'
import { RouteParams } from '..'
import Welcome from '../../screens/Welcome'
import { SLIDE_ANIMATION } from '../../common/constants'

const Stack = createStackNavigator<RouteParams>()

const AuthStack = () => {
  const { loggedIn } = useUser()
  const allowLogin = !loggedIn
  const renderHeader = (
    props: StackHeaderProps
  ) => {
    const {
      scene: {
        route: { name }
      }
    } = props
    const heading =
      name === 'Signup2' ? 'Create Profile' : name
    const showNav = name === 'Signup2'
    return showNav ? (
      <Navbar hideBell hideMenu title={heading} />
    ) : null
  }
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => renderHeader(props),
        ...SLIDE_ANIMATION
      }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
      />
      {allowLogin && (
        <Stack.Screen
          name="Login"
          component={Login}
        />
      )}
      {allowLogin && (
        <Stack.Screen
          name="Signup"
          component={Signup}
        />
      )}
      <Stack.Screen
        name="Signup2"
        component={Signup2}
      />
    </Stack.Navigator>
  )
}

export default AuthStack
