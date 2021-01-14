import firebase from 'firebase'
import { Alert } from 'react-native'
import { auth } from '../config/firebase'
import { User } from '../types'

type UserResponse = Partial<User>

export default class AuthService {
  /**
   * Listens for user login state and returns result to
   * callback function
   * @param onAuthChange auth state changed callback
   */
  static authStateListener(
    onAuthChange: (user: firebase.User) => void
  ) {
    const subscriber = auth.onAuthStateChanged(
      onAuthChange
    )
    return subscriber
  }

  static async signUp(
    email: string,
    password: string
  ): Promise<UserResponse> {
    try {
      const {
        user
      } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      const {
        uid: id,
        displayName,
        photoURL: imageUrl
      } = user
      return { displayName, imageUrl, email, id }
    } catch (error) {
      const { code } = error
      if (code === 'auth/email-already-in-use') {
        Alert.alert(
          'Error',
          'Account already exists'
        )
      }
      if (code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email')
      }
      Alert.alert('Error', error.message)
      return null
    }
  }

  static async login(
    email: string,
    password: string
  ): Promise<UserResponse> {
    try {
      const {
        user
      } = await auth.signInWithEmailAndPassword(
        email,
        password
      )
      const {
        uid: id,
        displayName,
        photoURL: imageUrl
      } = user
      return { displayName, imageUrl, email, id }
    } catch (error) {
      const { code } = error
      if (code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email')
      }
      Alert.alert('Error', error.message)
      return null
    }
  }

  static async signout(): Promise<boolean> {
    try {
      await auth.signOut()
      return true
    } catch (error) {
      alert(error.message)
      return false
    }
  }

  static async sendVerificationEmail(): Promise<boolean> {
    try {
      const user = auth.currentUser
      await user.sendEmailVerification()
      return true
    } catch (e) {
      Alert.alert(e.message)
      return false
    }
  }

  static async updateAuthEmail(email: string) {
    try {
      const user = auth.currentUser
      await user.updateEmail(email)
      return true
    } catch (e) {
      Alert.alert(e.message)
      return false
    }
  }
}
