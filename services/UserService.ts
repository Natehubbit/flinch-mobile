import { db } from '../config/firebase'
import { User } from '../types'

const UsersRef = db.collection('users')

export default class UserService {
  static async addUser (user:User) {
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
      const data = await UsersRef.doc(id).get()
      return data.data()
    } catch (error) {
      alert(error.message)
      return null
    }
  }

  static async updateUser (data:User):Promise<User> {
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
