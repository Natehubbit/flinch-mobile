import { db } from '../config/firebase'
import { User, UserResponse } from '../types'

const UsersRef = db.collection('users')

export default class UserService {
  static async addUser (user:UserResponse) {
    try {
      await UsersRef.doc(user.id).set(user)
      return user
    } catch (error) {
      alert(error.message)
      return null
    }
  }

  static async getUser (id:string) {
    try {
      const doc = await UsersRef.doc(id).get()
      return { id: doc.id, ...doc.data() } as User
    } catch (e) {
      alert(e.message)
      return null
    }
  }

  static async update (
    data:Partial<User>
  ):Promise<UserResponse> {
    try {
      const {
        id,
        ...details
      } = data
      await UsersRef.doc(id).update({
        ...details
      })
      return data
    } catch (error) {
      alert(error.message)
      return null
    }
  }
}
