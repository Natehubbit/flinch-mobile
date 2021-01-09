import { db } from '../config/firebase'
import { Celeb, Celebs } from '../types'

const CelebsRef = db.collection('celebs')

export default class CelebService {
  static async getCelebs ():Promise<Celebs> {
    try {
      const res = await CelebsRef.get()
      const celebs:Celebs = res.docs.map(doc => ({
        id: doc.id,
        craft: '',
        bio: '',
        imageUrl: '',
        alias: '',
        popularity: 0,
        price: {
          amount: 0,
          currency: 'GHS'
        },
        ...doc.data()
      }))
      return celebs
    } catch (error) {
      alert(error.message)
      return null
    }
  }

  static async getCeleb (id:string):Promise<Celeb> {
    try {
      const res = await CelebsRef.doc(id).get()
      return {
        id: res.id,
        alias: '',
        bio: '',
        craft: '',
        imageUrl: '',
        popularity: 0,
        price: {
          amount: 0,
          currency: 'GHS'
        },
        ...res.data()
      }
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async updateCeleb (
    data:Partial<Celeb>):Promise<boolean> {
    try {
      const { id, ...payload } = data
      if (!id) throw new Error('Missing Celeb id')
      await CelebsRef
        .doc(id)
        .update({
          ...payload
        })
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
}
