import React from 'react'
import { NAVLINKS } from '../../data'
import NavLink from './NavLink'

const NavList = () => {
  return (
    <div className='flex items-center justify-center space-x-10 h-full'>
      {NAVLINKS.map((link, index) => (
        <NavLink
          key={link.label}
          label={link.label}
          url={link.url}
          index={index}
        />
      ))}
    </div>
  )
}

export default NavList
