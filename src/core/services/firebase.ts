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
  DataSnapshot,
  update as firebaseUpdate,
  remove as firebaseRemove,
  off as firebaseOff,
  ref as firebaseRef,
  get as firebaseGet,
  push as firebasePush,
  onValue as firebaseOnValue,
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

const ref = (param: string) => {
  return firebaseRef(db, param)
}

const onValue = (param: string, callback: (snapshot: DataSnapshot) => unknown) => {
  return firebaseOnValue(ref(param), callback)
}

const get = (param: string) => {
  return firebaseGet(ref(param))
}

const push = (param: string, value: unknown) => {
  return firebasePush(ref(param), value)
}

const off = (param: string) => {
  return firebaseOff(ref(param))
}

const remove = (param: string) => {
  return firebaseRemove(ref(param))
}

const update = (param: string, values: object) => {
  return firebaseUpdate(ref(param), values)
}

export {
  off,
  update,
  remove,
  ref,
  get,
  push,
  onValue,
  onAuthStateChanged,
  signInWithPopup
}