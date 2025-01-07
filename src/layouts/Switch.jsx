import { motion } from 'framer-motion'

const Switch = ({ state, handler }) => {
  return (
    <div
      className={`switch w-[46px] h-[25px] rounded-full flex items-center cursor-pointer px-[5px] ${
        state ? 'bg-slate-500' : 'bg-slate-300'
      } z-30`}
      style={{ borderRadius: '1000px' }}
      onClick={handler}
    >
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: state ? '16px' : 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`handle w-[20px] h-[20px] bg-white rounded-full shadow-md ${
          state ? 'shadow-black/80' : 'shadow-black/30'
        } z-40`}
      />
    </div>
  )
}

export default Switch
