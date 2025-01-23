import React, { useContext } from 'react'
import { LoadingContext } from '../context/LoadingProvider'
import loader from '../assets/loader.svg'

const Loader = () => {
  const { loadingState } = useContext(LoadingContext)

  return (
    loadingState.isLoading && (
      <div className='absolute inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center flex-col justify-center text-white'>
        <img src={loader} alt='Loading...' />

        {loadingState.message && (
          <p className='text-3xl font-semibold'>{loadingState.message}</p>
        )}
      </div>
    )
  )
}

export default Loader