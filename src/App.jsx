
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import LandingPg from './PagesForUser/LandingPg'
import SignUp from './PagesForUser/SignUpPg'
import Layout from './Componants/Layout'
import LogInPg from './PagesForAdmin/LogInPg'

import { AddHotelForm } from './PagesForAdmin/FormPg'
import HomePg from './PagesForUser/HomePg'
import SignIn from './PagesForUser/LogInPg'
import Register from './PagesForAdmin/SignUpPg'
import Profile from './PagesForAdmin/Profle'
import ProfileUser from './PagesForUser/ProfileUserPg'
import { BookingForm } from './PagesForUser/FormPg'

function App() {


  return (
    <>
     <BrowserRouter>
      <Routes>
        {/* user */}
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPg />} />
          <Route path='/landing' element={<LandingPg />} />
          <Route path="/log-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<HomePg />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/booking" element={<BookingForm />} />



          {/* admin */}
          <Route path="/logIn" element={<LogInPg />} />
          <Route path="/register" element={<Register />} />
          <Route path="/AddHotel" element={<AddHotelForm />} />
          <Route path="/profileAdmin" element={<Profile />} />

        </Route>

        {/* User Profile Route (No Layout) */}

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
