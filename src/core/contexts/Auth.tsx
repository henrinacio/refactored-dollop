import { createContext, useEffect, useState, useContext }from 'react'

import { onAuthStateChanged, signInWithPopup } from '../services/firebase'

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

const AuthContext = createContext({} as AuthContextType)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
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
    const result = await signInWithPopup()
      
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
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }