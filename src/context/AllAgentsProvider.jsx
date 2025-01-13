import React, { createContext, useEffect, useState } from 'react'

const AllAgentsContext = createContext()

const AllAgentsProvider = ({ children }) => {
  const [allAgents, setAllAgents] = useState([])
  const [agentsImages, setAgentsImages] = useState()

  const getAllAgents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authToken: localStorage.getItem('auth-token'),
        }),
      })

      const json = await response.json()

      const imagesResponse = await getAllAgentsImages()
      // if (!imagesResponse.success) {
      //   throw new Error('Could not get agents images.')
      // }

      setAllAgents(json.agents)
    } catch (error) {
      console.error(error)
    }
  }

  const getAllAgentsImages = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/auth/get-agent-images',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            authToken: localStorage.getItem('auth-token'),
          }),
        }
      )

      const json = await response.json()

      setAgentsImages(json.images)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAllAgents()
  }, [])

  return (
    <AllAgentsContext.Provider
      value={{ allAgents, agentsImages, getAllAgents }}
    >
      {children}
    </AllAgentsContext.Provider>
  )
}

export default AllAgentsProvider
export { AllAgentsContext }
