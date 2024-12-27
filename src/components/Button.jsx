import React from 'react'

const Button = ({ children, className }) => {
  return (
    <button
      className={`bg-white text-black px-10 py-5 text-xl font-semibold tracking-wider`}
    >
      {children}
    </button>
  )
}

export default Button
