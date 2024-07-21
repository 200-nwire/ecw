import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import moment from 'moment'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
;(async () => {
  await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
})()

export const provider = new firebase.auth.GoogleAuthProvider()
export const auth = firebase.auth()

export default firebase

class FireBaseUser {
  user = null as any
  lastCreateToken = new Date(null as any)
  token = null

  getUser() {
    return this.user
  }
  async setUser(user: any) {
    this.user = user
    this.token = await user?.getIdToken(true)
  }

  async getToken() {
    if (new Date() < this.lastCreateToken && this.token) {
      return this.token
    }
    this.token = await this.user?.getIdToken(true)
    this.lastCreateToken = moment(new Date()).add(1, 'm').toDate()
    return this.token
  }

  logout() {
    this.user = null
    this.token = null
  }
}

export const fireBaseUser = new FireBaseUser()
