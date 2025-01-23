import React, { createContext, useState } from 'react'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
  const [loadingState, setLoadingState] = useState({
    isLoading: false,
    message: null,
  })

  return (
    <LoadingContext.Provider value={{ loadingState, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider
export { LoadingContext }
