import Axios from 'axios'
import { PaymentInitData, PaymentInitResponse } from '../types'

const API = 'https://us-central1-shoutouts-3c57c.cloudfunctions.net/'

export default class PaymentService {
    static init = async (data:PaymentInitData):Promise<PaymentInitResponse|null> => {
      try {
        const result = await Axios.post(
                `${API}initializePayment`,
                data
        )
        const res:PaymentInitResponse = result.data.data
        return res
      } catch (error) {
        console.log('bh')
        alert(error.message)
        return null
      }
    }
}
