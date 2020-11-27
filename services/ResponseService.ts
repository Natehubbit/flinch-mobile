import { db } from '../config/firebase'
import { ResponsePayload } from '../types'

const RequestRef = db.collection('requests')

export default class ResponseService {
  static async getApproved (id:string): Promise<ResponsePayload[]|null> {
    try {
      const snapshot = await RequestRef
        .where('requestor.id', '==', id)
        .where('response.status', '==', 'approved')
        .get()
      return snapshot.docs.map(d => ({
        id: d.id,
        celebrity: d.data().celebrity.name,
        recipient: d.data().recipient,
        ...d.data().response
      }))
    } catch (e) {
      alert(e.message)
      return null
    }
  }
}
