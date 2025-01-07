import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'

const ProtectedRoute = ({ children }) => {
  const { agent } = useContext(AgentAuthenticationContext)

  let location = useLocation()

  if (!agent.isAuthenticated) {
    return <Navigate to='/sign_in' state={{ from: location }} replace />
  }

  // if (agent.isAuthenticated) {
  //   return <Navigate to='/sign_in' state={{ from: location }} replace />
  // }
  return children
}

export default ProtectedRoute
