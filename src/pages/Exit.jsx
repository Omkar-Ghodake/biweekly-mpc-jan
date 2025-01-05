import { motion } from 'framer-motion'
import React from 'react'
import { RiRestartLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import revolver from '../assets/revolver_icon.png'

const Exit = () => {
  return (
    <div className='h-full w-full absolute inset-0 flex flex-col justify-center items-center space-y-20 -translate-y-20'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='space-y-10 flex flex-col items-center justify-center'
      >
        <h1 className='text-7xl font-bold'>THANK YOU!</h1>

        <p className='text-4xl text-red-400 font-bebas tracking-wider'>
          For Visiting MPC Bureau.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='group flex flex-col items-center space-y-5 absolute left-1/2 -translate-x-1/2 bottom-10 overflow-hidden'
      >
        <Link to={'/'} className='w-14'>
          <img
            src={revolver}
            alt=''
            className='w-full brightness-0 invert group-hover:rotate-180 hover:brightness-50 duration-150'
          />
        </Link>
        <p className='text-3xl font-topSecret opacity-0 group-hover:opacity-100 duration-200'>
          Revisit The Bureau
        </p>
      </motion.div>
    </div>
  )
}

export default Exit
