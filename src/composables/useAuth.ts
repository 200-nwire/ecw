import firebase, { fireBaseUser } from '@/Firebase'
import router from '@/router'
import { resetClientStore } from '@/services/GraphQlClient'

export function useAuth() {
  const logout = () => {
    firebase.auth().signOut()
    fireBaseUser.logout()
    resetClientStore()
    router.push('/login')
  }

  const login = async (email, password) => {
    try {
      const loginRes = await firebase.auth().signInWithEmailAndPassword(email, password)
      loginRes && (await fireBaseUser.setUser(loginRes.user))
      return loginRes
    } catch {
      console.log('authentication error')
      return null
    }
  }

  const getToken = async () => {
    const token = await fireBaseUser.getToken()
    return token
  }

  const isAuthenticated = () => {
    return !!firebase.auth().currentUser
  }
  return {
    login,
    logout,
    getToken,
    isAuthenticated,
  }
}
