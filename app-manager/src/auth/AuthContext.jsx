import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import {
  apiPost,
  clearAuthToken,
  getAuthToken,
  setAuthToken,
  SESSION_EXPIRED_EVENT,
} from '../api/client.js'
import { isKnownRole } from './roles.js'

// Session du staff : token JWT (gere par api/client.js) + role renvoye par /auth/login.
const ROLE_KEY = 'senyummies_manager_role'

const AuthContext = createContext(null)

function readStoredRole() {
  const role = localStorage.getItem(ROLE_KEY)
  return getAuthToken() && isKnownRole(role) ? role : null
}

export function AuthProvider({ children }) {
  const [role, setRole] = useState(readStoredRole)

  const logout = useCallback(() => {
    clearAuthToken()
    localStorage.removeItem(ROLE_KEY)
    setRole(null)
  }, [])

  const login = useCallback(async (username, password) => {
    // Un ancien token ne doit pas accompagner la tentative de connexion.
    clearAuthToken()
    const { token, role: receivedRole } = await apiPost('/auth/login', { username, password })
    if (!token || !isKnownRole(receivedRole)) {
      throw new Error('Réponse de connexion inattendue du serveur.')
    }
    setAuthToken(token)
    localStorage.setItem(ROLE_KEY, receivedRole)
    setRole(receivedRole)
    return receivedRole
  }, [])

  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, logout)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, logout)
  }, [logout])

  return <AuthContext.Provider value={{ role, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
