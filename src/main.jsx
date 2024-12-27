import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import Navbar from './layouts/navbar/Navbar.jsx'
import Landing from './pages/Landing.jsx'
import WhatWeDo from './pages/WhatWeDo.jsx'
import Bureau from './pages/Bureau.jsx'
import Black from './pages/Black.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <div className='bg-black text-white font-raleway h-screen overflow-hidden'>
        <Navbar />
        <div className='mt-[10vh] h-full'>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/black' element={<Black />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/investigations' element={<WhatWeDo />} />
            <Route path='/bureau' element={<Bureau />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </StrictMode>
)
