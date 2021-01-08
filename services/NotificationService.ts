import { getExpoPushTokenAsync } from 'expo-notifications'

export default class NotificationService {
  static async getToken () {
    return await getExpoPushTokenAsync()
  }
}
