import * as firebase from 'firebase/app'

import * as auth from 'firebase/auth'
import * as database from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

const app = firebase.initializeApp(firebaseConfig)

const authInstance = auth.getAuth(app)
const databaseInstance = database.getDatabase(app)

export {
  auth,
  database,
  authInstance,
  databaseInstance
}