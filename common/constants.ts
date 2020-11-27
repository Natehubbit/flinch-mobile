import { PaymentMode, Request } from '../types'

export const API = 'http://localhost:5001/shoutouts-3c57c/us-central1/'

export const RECORD_DURATION = 60 // seconds

export const PAYMENT_CALLBACK = 'https://us-central1-shoutouts-3c57c.cloudfunctions.net/paymentCallback'

export const PAYMENT_OPTIONS:PaymentMode[] = [
  {
    label: 'Mobile Money',
    icon: 'cellphone'
  },
  {
    label: 'Credit Card',
    icon: 'credit-card-outline'
  }
]

export const initStateRequest: Request = {
  id: '',
  celebrity: {
    id: '',
    name: ''
  },
  response: {
    status: 'pending',
    duration: 0,
    videoUri: '',
    timestamp: 0
  },
  instructions: '',
  occasion: '',
  recipient: '',
  requestor: {
    id: '',
    name: ''
  },
  status: 'pending',
  price: 0,
  timestamp: 0,
  payment: {
    id: '',
    amount: 0,
    payed: false,
    timestamp: 0
  }
}

// PATHS

export const REQUEST_VIDEO_PATH = 'request/'
export const THUMBS_PATH = 'thumbnails/'
