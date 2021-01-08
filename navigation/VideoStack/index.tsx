import 'react-native-gesture-handler'
import React from 'react'
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import Navbar from '../../components/Navbar'
import { RouteParams } from '..'
import Videos from '../../screens/Videos'
import { SLIDE_ANIMATION } from '../../common/constants'

const Stack = createStackNavigator<RouteParams>()

const VideoStack = () => {
  const renderHeader = (props:StackHeaderProps) => {
    const { scene: { route: { name } } } = props
    return <Navbar title={name} hideBell/>
  }

  return (
        <Stack.Navigator
            screenOptions={{
              header: props => renderHeader(props),
              ...SLIDE_ANIMATION
            }}
        >
          <Stack.Screen name='Videos' component={Videos} />
        </Stack.Navigator>
  )
}

export default VideoStack
