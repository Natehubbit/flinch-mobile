import 'react-native-gesture-handler'
import React from 'react'
import {
  NavigationContainer,
  RouteProp
} from '@react-navigation/native'
import AuthStack from './AuthStack'
import { useUser } from '../hooks/useUser'
import NavigationService from '../services/NavigationService'
import RootStack from './RootStack'
import { Celeb, Request } from '../types'

export type VideoNavParam = {
  id: string
  duration: number
  recipient: string
  date: string
  name: string
  uri: string
}

export type RouteParams = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  Signup2: {email:string, pass:string};
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Celeb: { data: Celeb };
  Book: {
    data: Pick<
      Celeb,
      | 'alias'
      | 'imageUrl'
      | 'id'
      | 'price'
      | 'token'
    >
  };
  Request: {
    id: string
    data?: Request
  };
  Requests: undefined;
  Profile: undefined;
  Videos: undefined;
  Video: VideoNavParam;
  VideoUpload: { id: string };
  RecordVideo: { id: string };
  Payment: {
    uri: string
  };
  PaymentMode: {
    data: {
      token: string
    }
  }
}

export type CelebScreenRouteProp = RouteProp<
  RouteParams,
  'Celeb'
>

export type BookScreenRouteProps = RouteProp<
  RouteParams,
  'Book'
>

export type VideoScreenRouteProps = RouteProp<
  RouteParams,
  'Video'
>

export type PaymentRouteProps = RouteProp<
  RouteParams,
  'Payment'
>

export type RequestScreenRouteProps = RouteProp<
  RouteParams,
  'Request'
>

export type RecordVideoScreenRouteProps = RouteProp<
  RouteParams,
  'RecordVideo'
>

export type UploadVideoScreenRouteProps = RouteProp<
  RouteParams,
  'VideoUpload'
>

export type Routes = keyof RouteParams

const Navigation: React.FC = () => {
  const { profileUpdated } = useUser()
  return (
    <NavigationContainer
      ref={(ref) => {
        NavigationService.navRef = ref
      }}>
      {profileUpdated ? (
        <RootStack />
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  )
}

export default Navigation
