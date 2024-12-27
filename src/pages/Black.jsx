import React from 'react'
import { Link } from 'react-router-dom'

const Black = () => {
  return (
    <Link
      to={'/'}
      className='text-4xl text-white absolute inset-0 h-screen w-screen'
    ></Link>
  )
}

export default Black
