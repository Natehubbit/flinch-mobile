import { db } from '../config/firebase'

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
        price: 0,
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
        price: 0,
        ...res.data()
      }
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export interface Celeb {
    id:string;
    alias:string;
    bio:string;
    craft:string;
    imageUrl:string;
    popularity:number;
    price:number;
    objectID?:string;
    role?:'celebrity'|'user'
}

export type Celebs = Celeb[]
