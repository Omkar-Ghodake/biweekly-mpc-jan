import { motion } from 'framer-motion'
import React, { useContext } from 'react'
import { ToastNotificationContext } from '../context/ToastNotificationProvider'

const ToastNotification = () => {
  const { toastNotificationState } = useContext(ToastNotificationContext)

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{
        opacity: 1,
        x: toastNotificationState.showToast ? '100%' : '100%',
      }}
      className={`absolute right-0 top-10 border-[1px] border-slate-500/50 border-l-white px-5 py-2 font-semibold tracking-wide z-50`}
    >
      {toastNotificationState.message}
    </motion.div>
  )
}

export default ToastNotification
