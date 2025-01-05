import React, { useContext, useState } from 'react'
import { NAVLINKS } from '../../data'
import NavLink from './NavLink'
import { AgentAuthenticationContext } from '../../context/AgentAuthenticationProvider'
import mpcBadge from '../../assets/mpcBadge.png'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const NavList = () => {
  const { agent, setAgent } = useContext(AgentAuthenticationContext)

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)

  const navigate = useNavigate()

  const handleLogOut = () => {
    localStorage.removeItem('auth-token')
    setAgent({
      isAuthenticated: false,
      domain_name: null,
      emp_id: null,
      role: null,
      resigned: null,
    })
    navigate('/sign_in')
  }

  return (
    <div className='relative flex items-center justify-center space-x-10 h-full'>
      {NAVLINKS.map((link, index) => (
        <NavLink
          key={link.label}
          label={link.label}
          url={link.url}
          index={index}
        />
      ))}

      {agent.isAuthenticated && (
        <div className='absolute right-10 text-lg font-semibold text-white h-3/5 '>
          <span
            className='flex items-center justify-center space-x-2 cursor-pointer rounded-md duration-150 hover:bg-gray-500/30 w-full h-full px-4'
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          >
            <img src={mpcBadge} alt='' className='w-full h-2/3' />
            <span>{agent.domain_name}</span>
          </span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isProfileMenuOpen ? 1 : 0 }}
            className='mt-3 flex flex-col space-y-2 rounded-lg'
          >
            <span className='py-2 text-center rounded-lg cursor-pointer bg-zinc-500/70 hover:bg-zinc-500/90 duration-150'>
              Profile
            </span>
            <span
              className='py-2 text-center rounded-lg cursor-pointer bg-zinc-500/70 hover:bg-zinc-500/90 duration-150 text-red-400'
              onClick={handleLogOut}
            >
              Logout
            </span>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default NavList
