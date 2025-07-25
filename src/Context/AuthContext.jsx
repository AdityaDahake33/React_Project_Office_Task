import React, { createContext, useContext, useState, useEffect } from 'react'
import { getLocalStorage } from '../Utils/LocalStoreage'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [employees, setEmployees] = useState([])
  const [admin, setAdmin] = useState([])

  useEffect(() => {
    const { employees, admin } = getLocalStorage()
    setEmployees(employees || [])
    setAdmin(admin || [])
  }, [])

  return (
    <AuthContext.Provider value={{ employees, admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider