import { getExpoPushTokenAsync } from 'expo-notifications'
import { db } from '../config/firebase'
import { NotificationMessage } from '../types'

const NotificationsRef = db.collection('notifications')
export default class NotificationService {
  static async getToken () {
    return await getExpoPushTokenAsync()
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
}
