import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.jsx'
import ProtectedRoute from './components/PrivateRoute.jsx'
import ToastNotification from './components/ToastNotification.jsx'
import AgentAuthenticationProvider from './context/AgentAuthenticationProvider.jsx'
import ToastNotificationProvider from './context/ToastNotificationProvider.jsx'
import './index.css'
import Navbar from './layouts/navbar/Navbar.jsx'
import AgentUpdate from './pages/AgentUpdate.jsx'
import Black from './pages/Black.jsx'
import Bureau from './pages/Bureau.jsx'
import Landing from './pages/Landing.jsx'
import SignIn from './pages/SignIn.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Exit from './pages/Exit.jsx'
import UpdateExistingAgent from './pages/UpdateExistingAgent.jsx'
import CreateNewAgent from './pages/CreateNewAgent.jsx'

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
                <Route path='/exit' element={<Exit />} />
                <Route path='/temp' element={<AgentUpdate />} />

                <Route
                  path='/'
                  element={
                    // <ProtectedRoute>
                    <App />
                    // </ProtectedRoute>
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
                />

                <Route
                  path='/dashboard'
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/dashboard/update-existing-agent'
                  element={
                    <ProtectedRoute>
                      <UpdateExistingAgent />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path='/dashboard/create-new-agent'
                  element={
                    <ProtectedRoute>
                      <CreateNewAgent />
                    </ProtectedRoute>
                  }
                />

                <Route path='/sign_in' element={<SignIn />} />
                
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ToastNotificationProvider>
    </AgentAuthenticationProvider>
  </StrictMode>
)
