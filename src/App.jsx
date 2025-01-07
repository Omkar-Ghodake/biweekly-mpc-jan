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
      <video src={introVideo} autoPlay muted className='h-full w-full'>
        Video not found
      </video>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className='absolute right-10 bottom-10 flex items-center space-x-5 text-6xl duration-150 group'
      >
        {agent.isAuthenticated && (
          <Link
            to={'/landing'}
            className={`flex items-center space-x-5 text-stone-800/70 hover:text-stone-800 duration-150`}
          >
            <span className='font-topSecret'>ENTER BUREAU</span>
            <FaGun className='text-white/70 group-hover:text-white' />
          </Link>
        )}
      </motion.div>
    </div>
  )
}

export default App
