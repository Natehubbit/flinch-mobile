import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack'
import React from 'react'
import { SLIDE_ANIMATION } from '../../common/constants'
import Navbar from '../../components/Navbar'
import { useUser } from '../../hooks/useUser'
import Request from '../../screens/Request'
import Requests from '../../screens/Requests'
import VideoRecord from '../../screens/VideoRecord'
import VideoUpload from '../../screens/VideoUpload'
import RequestsTabs from '../RequestsTabs'

const Stack = createStackNavigator()

const RequestStack: React.FC = () => {
  const { role } = useUser()
  const renderRequests = () => {
    return role === 'celebrity'
      ? RequestsTabs
      : Requests
  }
  const renderHeader = (props:StackHeaderProps) => {
    const { scene: { route: { name } } } = props
    const heading = name === 'VideoUpload'
      ? 'Upload Video'
      : name
    const show = name === 'RecordVideo'
    return !show ? <Navbar title={heading} hideBell/> : null
  }

  return <Stack.Navigator
        screenOptions={{
          header: props => renderHeader(props),
          ...SLIDE_ANIMATION
        }}
    >
        <Stack.Screen name='Requests' component={renderRequests()} />
        <Stack.Screen name='Request' component={Request} />
        <Stack.Screen name='VideoUpload' component={VideoUpload} />
        <Stack.Screen name='RecordVideo' component={VideoRecord} />
    </Stack.Navigator>
}

export default RequestStack
