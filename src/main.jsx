import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import App from './App.jsx'
import './index.css'
import Navbar from './layouts/navbar/Navbar.jsx'
import Black from './pages/Black.jsx'
import Bureau from './pages/Bureau.jsx'
import Landing from './pages/Landing.jsx'
import SignIn from './pages/SignIn.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import ToastNotificationProvider from './context/ToastNotificationProvider.jsx'
import ToastNotification from './components/ToastNotification.jsx'
import AgentAuthenticationProvider from './context/AgentAuthenticationProvider.jsx'
import ProtectedRoute from './components/PrivateRoute.jsx'
import AgentUpdate from './pages/AgentUpdate.jsx'

const isAuthenticated = false

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AgentAuthenticationProvider>
      <ToastNotificationProvider>
        <BrowserRouter>
          <div className='bg-black text-white font-raleway h-screen overflow-hidden'>
            <Navbar />

            <ToastNotification />

            <div className='mt-[10vh] h-full'>
              <Routes>
                <Route path='/black' element={<Black />} />

                {/* <Route
                  path='/'
                  element={
                    <ProtectedRoute>
                      <App />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/landing'
                  element={
                    <ProtectedRoute>
                      <Landing />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/investigations'
                  element={
                    <ProtectedRoute>
                      <WhatWeDo />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/bureau'
                  element={
                    <ProtectedRoute>
                      <Bureau />
                    </ProtectedRoute>
                  }
                /> */}

                <Route path='/' element={<App />} />

                <Route path='/landing' element={<Landing />} />

                <Route path='/investigations' element={<WhatWeDo />} />

                <Route path='/bureau' element={<Bureau />} />

                <Route path='/sign_in' element={<SignIn />} />

                <Route path='/agent_update' element={<AgentUpdate />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ToastNotificationProvider>
    </AgentAuthenticationProvider>
  </StrictMode>
)
