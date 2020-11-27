import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import AuthStack from './AuthStack'
import AppDrawer from './AppDrawer'
import { useUser } from '../hooks/useUser'
import { Celeb } from '../services/CelebService'
import NavigationService from '../services/NavigationService'

export type VideoNavParam = {
  id:string;
  duration:number;
  recipient:string;
  date:string;
  name:string;
  uri:string;
}

export type RouteParams = {
  Login: undefined;
  Signup: undefined;
  Signup2: undefined;
  Home: undefined;
  Search: undefined;
  Notifications: undefined;
  Celeb: {data:Celeb};
  Book: {data:Pick<Celeb, 'alias'|'imageUrl'|'id'|'price'>};
  Payment: undefined;
  PaymentCard: undefined;
  PaymentMobile: undefined;
  Request: {id:string};
  Requests: undefined;
  Profile: undefined;
  Videos: undefined;
  Video: VideoNavParam;
  VideoUpload: {id:string;};
  RecordVideo: {id:string};
  WebView: {uri:string;onStopLoading?:()=>void}
}

export type CelebScreenRouteProp =
  RouteProp<RouteParams, 'Celeb'>;

export type BookScreenRouteProps =
  RouteProp<RouteParams, 'Book'>;

export type VideoScreenRouteProps =
  RouteProp<RouteParams, 'Video'>;

export type RequestScreenRouteProps =
  RouteProp<RouteParams, 'Request'>;

export type RecordVideoScreenRouteProps =
  RouteProp<RouteParams, 'RecordVideo'>;

export type UploadVideoScreenRouteProps =
  RouteProp<RouteParams, 'VideoUpload'>;

export type Routes = keyof RouteParams

const Navigation: React.FC = () => {
  const { profileUpdated } = useUser()
  return <NavigationContainer
    ref={ref => NavigationService.setRef(ref)}
  >
    {profileUpdated
      ? <AppDrawer/>
      : <AuthStack/>}
    </NavigationContainer>
}

export default Navigation
