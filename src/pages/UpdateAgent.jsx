import React, { useContext, useState } from 'react'
import { AllAgentsContext } from '../context/AllAgentsProvider'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { IoArrowBackSharp } from 'react-icons/io5'
import UpdateExistingAgentForm from '../components/UpdateExistingAgentForm'

const UpdateAgent = () => {
  const [selectedAgent, setSelectedAgent] = useState(null)

  const { allAgents } = useContext(AllAgentsContext)

  return (
    <>
      <div className='h-full px-10 overflow-y-auto'>
        <Link
          to={'/dashboard'}
          className='text-3xl flex justify-center items-center rounded-full h-10 w-10 hover:text-inherit hover:bg-slate-500/40 duration-150 mb-2'
        >
          <IoArrowBackSharp />
        </Link>

        <h1 className='text-2xl font-semibold'>Select Agent to update</h1>

        <div className='py-10 grid grid-cols-4 gap-x-5 gap-y-5'>
          {allAgents &&
            allAgents.length > 0 &&
            allAgents.map((agent, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className='py-3 px-4 flex justify-between items-center bg-white/10 rounded-lg cursor-pointer hover:bg-white/20 duration-150'
                onClick={() => setSelectedAgent(agent)}
              >
                <span>{agent.domain_name}</span>
                <span className='font-mono'>{agent.emp_id}</span>
              </motion.div>
            ))}
        </div>
      </div>

      <UpdateExistingAgentForm
        selectedAgent={selectedAgent}
        setSelectedAgent={setSelectedAgent}
      />
    </>
  )
}

export default UpdateAgent
