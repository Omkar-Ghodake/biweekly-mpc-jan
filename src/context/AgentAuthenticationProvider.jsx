import React, { createContext, useContext, useEffect, useState } from 'react'

const AgentAuthenticationContext = createContext()

const AgentAuthenticationProvider = ({ children }) => {
  const [agent, setAgent] = useState({
    isAuthenticated: false,
    domain_name: null,
    emp_id: null,
    role: null,
    resigned: null,
  })
  const [token, setToken] = useState(localStorage.getItem('auth-token'))

  const getAgent = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/get-agent', {
        method: 'POST',
        body: JSON.stringify({ authToken: localStorage.getItem('auth-token') }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const json = await response.json()

      // if (!json.success) return ''

      setAgent({
        ...agent,
        isAuthenticated: true,
        domain_name: json.agent.domain_name,
        emp_id: json.agent.emp_id,
        role: json.agent.role,
        resigned: json.agent.resigned,
      })
    } catch (error) {
      console.error(error)
    }
  }

  // useEffect(() => {
  //   getAgent()
  // }, [])

  return (
    <AgentAuthenticationContext.Provider value={{ agent, setAgent, getAgent }}>
      {children}
    </AgentAuthenticationContext.Provider>
  )
}

export default AgentAuthenticationProvider
export { AgentAuthenticationContext }
