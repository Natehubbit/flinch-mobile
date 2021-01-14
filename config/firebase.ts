import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
  apiKey:
    'AIzaSyBTGE_5_pMDsiocYexxVvpUAl4bd4mD7yc',
  authDomain: 'shoutouts-3c57c.firebaseapp.com',
  databaseURL:
    'https://shoutouts-3c57c.firebaseio.com',
  projectId: 'shoutouts-3c57c',
  storageBucket: 'shoutouts-3c57c.appspot.com',
  messagingSenderId: '431061869764',
  appId:
    '1:431061869764:web:6c472b4732feee74e11591',
  measurementId: 'G-5TW8YCZ8LD'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const storage = firebase.storage()
export const batch = firebase.firestore().batch
export const transaction = firebase.firestore()
  .runTransaction
