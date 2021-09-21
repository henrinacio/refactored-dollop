import React from 'react'
import { authInstance, auth } from '../services/firebase'

type Props = {
  children: React.ReactNode;
}

type User = {
  id: string,
  name: string,
  avatar: string,
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = React.createContext({} as AuthContextType)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = React.useState<User>()

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authInstance, (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    const provider = new auth.GoogleAuthProvider()

    const result = await auth.signInWithPopup(authInstance, provider)
      
    if (result.user) {
      const { displayName, photoURL, uid } = result.user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }