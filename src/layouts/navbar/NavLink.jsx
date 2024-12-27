import { motion } from 'framer-motion'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavLink = ({ label, url, index }) => {
  const { pathname } = useLocation()

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.15 }}
    >
      <Link
        to={url}
        className={`text-xl ${
          pathname === url
            ? 'hover:text-white hover:scale-95'
            : 'text-white/70 hover:text-white hover:scale-125 active:scale-90'
        } duration-150`}
      >
        {label}
      </Link>
    </motion.span>
  )
}

export default NavLink
