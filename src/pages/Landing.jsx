import React from 'react'
import landingImage from '../assets/landing_detective.jpg'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import { GiPistolGun } from 'react-icons/gi'
import { motion } from 'framer-motion'
import { AiOutlineAim } from 'react-icons/ai'

const Landing = () => {
  return (
    <div className='h-[90vh] w-full bg-transparent flex justify-between mt-[10vh] overflow-hidden'>
      <div className='w-fit p-20 pr-0 flex flex-col space-y-10'>
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
          className='text text-4xl text-red-400 font-bebas tracking-wider'
        >
          Investigating the Seva trail: Every MP’s contribution revealed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Link to={'/our-mission'}>
            <Button>
              Uncover Our Mission <AiOutlineAim className='ml-2 text-2xl' />
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        // initial={{ opacity: 0, x: '100%' }}
        // animate={{ opacity: 1, x: 0 }}
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
