import React, { useContext, useRef, useState } from 'react'
import { NAVLINKS } from '../../data'
import NavLink from './NavLink'
import { AgentAuthenticationContext } from '../../context/AgentAuthenticationProvider'
import mpcBadge from '../../assets/mpcBadge.png'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import useClickOutsideElement from '../../hooks/useClickOutside'

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

  const navMenuRef = useRef()

  useClickOutsideElement(navMenuRef, () => setIsProfileMenuOpen(false))

  return (
    <div className='relative flex items-center justify-center space-x-10 h-full'>
      {NAVLINKS.map((link, index) => (
        <NavLink
          key={link.url}
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
            ref={navMenuRef}
          >
            <img src={mpcBadge} alt='' className='w-full h-2/3' />
            <span className='uppercase text-red-200'>{agent.role}</span>
            <span>{agent.domain_name}</span>
          </span>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isProfileMenuOpen ? 1 : 0 }}
            className='mt-3 flex flex-col space-y-2 rounded-lg'
          >
            {agent.role !== 'agent' && (
              <Link
                to='/dashboard'
                className='py-2 text-center rounded-lg cursor-pointer bg-zinc-500/70 hover:bg-zinc-500/90 duration-150 hover:text-inherit'
              >
                Dashboard
              </Link>
            )}

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
