import React, { useContext } from 'react'
import { NAVLINKS } from '../../data'
import NavLink from './NavLink'
import { AgentAuthenticationContext } from '../../context/AgentAuthenticationProvider'

const NavList = () => {
  const { agent } = useContext(AgentAuthenticationContext)

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
        <span className='absolute right-10 text-lg font-mono font-semibold text-red-500  px-5 h-1/2 flex items-center justify-center'>
          {agent.emp_id}
        </span>
      )}
    </div>
  )
}

export default NavList
