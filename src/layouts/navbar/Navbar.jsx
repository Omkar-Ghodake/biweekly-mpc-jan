import React from 'react'
import NavList from './NavList'
import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const showNavbarOnPaths = ['/landing', '/investigations', '/bureau']

  const { pathname } = useLocation()

  return (
    <div className='absolute inset-0 h-[10vh] z-50'>
      {showNavbarOnPaths.includes(pathname) && <NavList />}
    </div>
  )
}

export default Navbar
