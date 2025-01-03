import React, { createContext, useState } from 'react'

const ToastNotificationContext = createContext()

const ToastNotificationProvider = ({ children }) => {
  const [toastNotificationState, setToastNotificationState] = useState({
    showToast: false,
    message: '',
  })

  const showToastMessage = (message) => {
    setToastNotificationState({ showToast: true, message })

    setTimeout(() => {
      setToastNotificationState({ showToast: false, message: '' })
    }, 3000)
  }

  return (
    <ToastNotificationContext.Provider
      value={{ toastNotificationState, showToastMessage }}
    >
      {children}
    </ToastNotificationContext.Provider>
  )
}

export default ToastNotificationProvider
export { ToastNotificationContext }
