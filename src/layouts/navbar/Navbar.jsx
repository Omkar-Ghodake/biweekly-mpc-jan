import React from 'react'
import NavList from './NavList'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const showNavbarOnPaths = [
    '/landing',
    '/investigations',
    '/bureau',
    '/dashboard',
    '/dashboard/create-new-agent',
    '/dashboard/update-existing-agent',
  ]

  const { pathname } = useLocation()

  return (
    <div className='absolute inset-0 h-[10vh] z-20'>
      {showNavbarOnPaths.includes(pathname) && <NavList />}
    </div>
  )
}

export default Navbar
