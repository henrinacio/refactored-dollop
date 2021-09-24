import { initializeApp } from 'firebase/app'

import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithPopup as firebaseSignInWithPopup,
  NextOrObserver,
  User
} from 'firebase/auth'

import {
  getDatabase,
  ref,
  get as firebaseGet,
  push as firebasePush
} from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getDatabase(app)
const provider = new GoogleAuthProvider()

const onAuthStateChanged = (callback: NextOrObserver<User>) => {
  return firebaseOnAuthStateChanged(auth, callback)
}

const signInWithPopup = () => {
  return firebaseSignInWithPopup(auth, provider)
}

const get = (param: string) => {
  return firebaseGet(ref(db, param))
}

const push = (param: string, value: unknown) => {
  return firebasePush(ref(db, param), value)
}

export {
  get,
  push,
  onAuthStateChanged,
  signInWithPopup
}