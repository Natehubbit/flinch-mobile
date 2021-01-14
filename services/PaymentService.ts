import Axios from 'axios'
import { db } from '../config/firebase'
import {
  PaymentInitData,
  PaymentInitResponse
} from '../types'

const API =
  'https://us-central1-shoutouts-3c57c.cloudfunctions.net/'
const RequestRef = db.collection('requests')

export default class PaymentService {
  static init = async (
    data: PaymentInitData
  ): Promise<PaymentInitResponse | null> => {
    try {
      const result = await Axios.post(
        `${API}initializePayment`,
        data
      )
      const res: PaymentInitResponse =
        result.data.data
      return res
    } catch (error) {
      alert(error.message)
      return null
    }
  }

  /**
   * listener for checking payment
   * @param id request id
   */
  static onPayed(
    id: string,
    callBack?: () => void
  ) {
    try {
      return RequestRef.doc(id).onSnapshot(
        (snap) => {
          const req = snap.data()
          req.payment.payed &&
            callBack &&
            callBack()
        }
      )
    } catch (e) {
      alert(e.message)
      return null
    }
  }
}
