import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import LandingPg from './PagesForUser/LandingPg'
import SignUpPg from './PagesForUser/SignUpPg'
import Layout from './Componants/Layout'
import LogInPg from './PagesForUser/LogInPg'
import SignUp from './PagesForAdmin/SignUpPg'
import ProfilePage from './PagesForUser/ProfilePg'
import { AddHotelForm } from './PagesForAdmin/FormPg'
import HomePg from './PagesForUser/HomePg'

function App() {


  return (
    <>
   <AddHotelForm/>
    </>
  )
}

export default App
