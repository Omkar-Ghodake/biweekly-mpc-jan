import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { AiOutlineAim } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import landingImage from '../assets/landing_detective.jpg'
import Button from '../components/Button'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'

const Landing = () => {
  const { agent } = useContext(AgentAuthenticationContext)

  // if (!agent.isAuthenticated) {
  //   console.log('agent.isAuthenticated:', agent.isAuthenticated)
  //   return <Navigate to={'/sign_in'} />
  // }

  console.log('agent:::', agent)

  return (
    <div className='h-[90vh] w-full bg-transparent flex justify-between mt-[10vh] overflow-hidden'>
      <div className='w-fit px-20 pr-0 flex flex-col justify-center space-y-10'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className='flex flex-col space-y-5'
        >
          <motion.h1 className='title text-9xl font-bold'>MPC</motion.h1>

          <motion.h2 className='text-6xl'>
            Member of Parliament's <br /> Corner
          </motion.h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, originX: 1 }}
          transition={{ duration: 1.5 }}
          className='text-4xl text-red-400 font-bebas tracking-wider'
        >
          Investigating the Seva trail: Every MP’s contribution revealed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link to={'/investigations'}>
            <Button>
              Uncover Our Mission <AiOutlineAim className='ml-2 text-2xl' />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        className='landing-image h-full'
      >
        <img src={landingImage} alt='' className='h-full' />
      </motion.div>
    </div>
  )
}

export default Landing
