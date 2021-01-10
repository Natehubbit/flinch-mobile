import { getExpoPushTokenAsync } from 'expo-notifications'
import { Alert } from 'react-native'
import { db } from '../config/firebase'
import { NotificationMessage } from '../types'
import * as Notifications from 'expo-notifications'

const NotificationsRef = db.collection('notifications')
export default class NotificationService {
  static async getToken () {
    try {
      return await getExpoPushTokenAsync()
    } catch (e) {
      Alert.alert('Error', e.message)
      return null
    }
  }

  static async getNotifications (id:string) {
    try {
      const res = await NotificationsRef
        .where('recipientId', '==', id)
        .get()
      return res
        .docs
        .map(d => d.data()) as NotificationMessage[]
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async getPermission () {
    try {
      const { granted } = await Notifications
        .requestPermissionsAsync()
      return granted
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static responseListener () {

  }

  static receivedListener () {
    
  }
}
