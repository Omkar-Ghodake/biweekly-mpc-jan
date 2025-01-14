import React, { useContext } from 'react'
import { AgentAuthenticationContext } from '../context/AgentAuthenticationProvider'
import DashboardItems from '../components/DashboardItems'
import { Link } from 'react-router-dom'
import { TiUser, TiUserAdd } from 'react-icons/ti'
import { MdEdit } from 'react-icons/md'
import { motion } from 'framer-motion'

const Dashboard = () => {
  const { agent } = useContext(AgentAuthenticationContext)

  return (
    <div className='p-10 space-y-10'>
      <h1 className='capitalize text-5xl font-semibold'>
        {agent.role}'s Dashboard
      </h1>

      <div className='flex space-x-10'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            to={'/dashboard/update-existing-agent'}
            className='hover:text-inherit'
          >
            <DashboardItems>
              <span className='relative'>
                <TiUser className='text-5xl' />
                <MdEdit className='absolute top-0 left-0 translate-x-[250%]' />
              </span>
              <span>Update existing Agent</span>
            </DashboardItems>
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Link
            to={'/dashboard/create-new-agent'}
            className='hover:text-inherit'
          >
            <DashboardItems>
              <TiUserAdd className='text-5xl' />
              <span>Create new Agent</span>
            </DashboardItems>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
