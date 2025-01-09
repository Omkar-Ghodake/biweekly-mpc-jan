import { motion } from 'framer-motion'
import { FaGun } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import './App.css'
import introVideo from './assets/introVideo.mp4'
import { useContext, useEffect } from 'react'
import { AgentAuthenticationContext } from './context/AgentAuthenticationProvider'

function App() {
  const { agent, getAgent } = useContext(AgentAuthenticationContext)

  useEffect(() => {
    getAgent()
  }, [])

  return (
    <div className='absolute inset-0 h-screen w-screen'>
      <video
        src={introVideo}
        autoPlay={agent.isAuthenticated}
        muted
        className='h-full w-full'
      >
        Video not found
      </video>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: agent.isAuthenticated && 2.5 }}
        className='absolute right-10 bottom-10 flex items-center space-x-5 text-6xl duration-150 group'
      >
        {agent.isAuthenticated ? (
          <Link
            to={'/landing'}
            className={`flex items-center space-x-5 text-white/70 hover:text-white duration-150`}
          >
            <span className='font-topSecret'>ENTER BUREAU</span>
            <FaGun className='text-white/70 group-hover:text-white' />
          </Link>
        ) : (
          <Link
            to={'/sign_in'}
            className={`flex items-center space-x-5 text-white/70 hover:text-white duration-150`}
          >
            <span className='font-topSecret'>Authenticate</span>
            <FaGun className='text-white/70 group-hover:text-white' />
          </Link>
        )}
      </motion.div>
    </div>
  )
}

export default App
