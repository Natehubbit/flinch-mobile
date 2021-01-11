import { getExpoPushTokenAsync, NotificationResponse, Notification } from 'expo-notifications'
import { Alert } from 'react-native'
import { db } from '../config/firebase'
import { NotificationMessage } from '../types'
import * as Notifications from 'expo-notifications'

const NotificationsRef = db.collection('notifications')
export default class NotificationService {
  constructor () {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: true,
        shouldShowAlert: true,
        shouldSetBadge: true
      })
    })
  }

  static async getToken () {
    try {
      return await getExpoPushTokenAsync()
    } catch (e) {
      Alert.alert('Error', e.message)
      return null
    }
  }

  static async updateNotification (
    id:string,
    data:Partial<NotificationMessage>
  ) {
    try {
      await NotificationsRef
        .doc(id)
        .update({
          ...data
        })
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static async getNotifications (
    id:string
  ):Promise<NotificationMessage[]|null> {
    try {
      const res = await NotificationsRef
        .where('recipientId', '==', id)
        .get()
      return res
        .docs
        .map(d => ({
          id: d.id,
          ...d.data()
        })) as NotificationMessage[]
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static listener (
    id:string,
    callback?:(val:NotificationMessage[])=>void
  ) {
    try {
      return NotificationsRef
        .where('recipientId', '==', id)
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as NotificationMessage))
          callback && callback(data)
        })
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

  static responseListener (
    callback?:
    (val:NotificationResponse) => void
  ) {
    const granted = this.getPermission()
    granted &&
      Notifications
        .addNotificationResponseReceivedListener(response => {
          callback && callback(response)
        })
  }

  static receivedListener (
    callback?:(val:Notification)=>void
  ) {
    const granted = this.getPermission()
    granted &&
      Notifications.addNotificationReceivedListener(e => {
        callback && callback(e)
      })
  }

  static removeListeners () {
    Notifications.removeAllNotificationListeners()
  }
}
