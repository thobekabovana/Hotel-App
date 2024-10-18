import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes, Router } from 'react-router-dom'


import LandingPg from './PagesForUser/LandingPg'
import SignUp from './PagesForUser/SignUpPg'
import Layout from './Componants/Layout'
import LogInPg from './PagesForAdmin/LogInPg'

import { AddHotelForm } from './PagesForAdmin/FormPg'
import HomePg from './PagesForUser/HomePg'
import SignIn from './PagesForUser/LogInPg'
import Register from './PagesForAdmin/SignUpPg'
import Profile from './PagesForAdmin/Profle'
import ProfileUser from './PagesForUser/ProfilePg'

function App() {


  return (
    <>
     
     <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPg />} />
            <Route path="log-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="home" element={<HomePg />} />
            <Route path="profileUser" element={<ProfileUser />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/logIn" element={<LogInPg />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AddHotel" element={<AddHotelForm />} />
          <Route path="/profileAdmin" element={<Profile />} />
        </Routes>
      </BrowserRouter>
   
    </>
  )
}

export default App
