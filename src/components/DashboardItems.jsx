import React from 'react'

const DashboardItems = ({ children }) => {
  return (
    <div className='w-[15vw] h-[10vw] p-4 rounded-lg bg-gray-500/20 cursor-pointer font-semibold border-2 border-zinc-500/30 hover:bg-zinc-500/30 duration-150 flex flex-col justify-between'>
      {children}
    </div>
  )
}

export default DashboardItems
