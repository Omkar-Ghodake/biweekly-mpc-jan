import React from 'react'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, className }) => {
  return (
    <button
      className={twMerge(
        'bg-white text-black px-10 py-4 text-xl font-semibold tracking-wider flex justify-center items-center hover:scale-x-105 duration-150',
        className
      )}
    >
      {children}
    </button>
  )
}

export default Button
