import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoadingContext } from './LoadingProvider'

const AllAgentsContext = createContext()

const AllAgentsProvider = ({ children }) => {
  const [allAgents, setAllAgents] = useState([])
  const [agentsImages, setAgentsImages] = useState()

  const { loadingState, setLoadingState } = useContext(LoadingContext)

  const getAllAgents = async () => {
    setLoadingState({ isLoading: true, message: 'Loading Agents...' })

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
      console.log('json:', json)
      // if (!imagesResponse.success) {
      //   throw new Error('Could not get agents images.')
      // }

      const findChief = json.agents?.find((agent) => agent.role === 'chief')
      console.log('findChief:', findChief)

      const otherAgents = json.agents?.filter((agent) => agent.role !== 'chief')
      console.log('otherAgents:', otherAgents)

      const sortedOtherAgents = otherAgents?.sort(
        (a, b) => b.total_score - a.total_score
      )
      console.log('sortedOtherAgents:', sortedOtherAgents)

      const sortedAgents = [findChief, ...sortedOtherAgents]

      setAllAgents(sortedAgents)
    } catch (error) {
      console.error(error)
    }

    setLoadingState({ isLoading: false, message: null })
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
