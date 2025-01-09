import React, { createContext, useEffect, useState } from 'react'

const AllAgentsContext = createContext()

const AllAgentsProvider = ({ children }) => {
  const [allAgents, setAllAgents] = useState([])

  const getAllAgents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth//agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authToken: localStorage.getItem('auth-token'),
        }),
      })

      const json = await response.json()

      setAllAgents(json.agents)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllAgents()
  }, [])

  return (
    <AllAgentsContext.Provider value={{ allAgents, getAllAgents }}>
      {children}
    </AllAgentsContext.Provider>
  )
}

export default AllAgentsProvider
export { AllAgentsContext }
