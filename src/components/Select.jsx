import React from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Select = ({ label, options, state, setState }) => {
  return (
    <div className=''>
      <div className='outline-none rounded-md bg-black border-2 border-slate-500/50 focus:border-slate-500 px-4 py-2 w-full flex items-center cursor-pointer hover:bg-white/10 duration-150'>
        {label} {state && `- ${state}`} <FaAngleDown className='ml-5' />
      </div>
    </div>
  )
}

export default Select
