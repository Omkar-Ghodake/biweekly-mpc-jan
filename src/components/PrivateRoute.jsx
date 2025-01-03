import React, { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'

const ProtectedRoute = ({ children }) => {
  const { token, agent } = useContext(AgentAuthenticationContext)

  let location = useLocation()

  useEffect(() => {}, [token])

  if (!agent.isAuthenticated) {
    return <Navigate to='/sign_in' state={{ from: location }} replace />
  }
  return children
}

export default ProtectedRoute
