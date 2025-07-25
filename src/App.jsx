import React, { useState, useEffect } from 'react'
import Login from './Companents/Auth/Login'
import AdminDashboard from './Companents/Dashboard/Admin_Dashboard'
import EmployeeDashboard from './Companents/Dashboard/Employee_Dashboard'
import { getLocalStorage } from './Utils/LocalStoreage'

const App = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser)
      setUser(userData.role)
      setLoggedInUserData(userData.data)
    }
    // Always fetch employees for admin sidebar
    const { employees } = getLocalStorage()
    setEmployees(employees || [])
  }, [])

  // New handleLogin signature: (role, userData)
  const handleLogin = (role, userData) => {
    setUser(role)
    setLoggedInUserData(userData)
    if (role === 'admin') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin', data: userData }))
    } else if (role === 'employee') {
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: userData }))
    }
  }

  const handleLogout = () => {
    setUser(null)
    setLoggedInUserData(null)
    localStorage.clear()
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }
  if (user === 'admin') {
    return <AdminDashboard employees={employees} onLogout={handleLogout} />
  }
  if (user === 'employee') {
    return <EmployeeDashboard user={loggedInUserData} onLogout={handleLogout} />
  }
  return null
}

export default App