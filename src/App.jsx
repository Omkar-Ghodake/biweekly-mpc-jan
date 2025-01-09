import { motion } from 'framer-motion'
import { FaGun } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import './App.css'
import introVideo from './assets/introVideo.mp4'
import { useContext, useEffect } from 'react'
import { AgentAuthenticationContext } from './context/AgentAuthenticationProvider'
// import unauthenticatedBg from './assets/unauthenticated_bg.jpg'
import unauthenticatedBg1 from './assets/unauthenticated_bg.jpg'
import unauthenticatedBg2 from './assets/AuthenticatePageImage.png'

function App() {
  const { agent, getAgent } = useContext(AgentAuthenticationContext)

  useEffect(() => {
    getAgent()
  }, [])

  // 151316

  return (
    <div className='absolute inset-0 h-screen w-screen'>
      {agent.isAuthenticated ? (
        <video src={introVideo} autoPlay muted className='h-full w-full'>
          Video not found
        </video>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='h-full w-full flex justify-between items-center'
        >
          <img src={unauthenticatedBg2} alt='' className='w-full' />

          <div className='w-full p-10 text-right space-y-10'>
            <p className='text-3xl text-red-200'>
              You are not authorized to access the Secret Bureau!
            </p>
            <p className='text-5xl tracking-wider'>
              Authenticate yourself to access the Secret Agent's Bureau.
            </p>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: agent.isAuthenticated && 2.5 }}
        className='absolute right-10 bottom-10 flex items-center space-x-5 text-6xl duration-150 group'
      >
        {agent.isAuthenticated ? (
          <Link
            to={'/landing'}
            className={`flex items-center space-x-5 text-red-500 hover:text-red-400 duration-150`}
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
