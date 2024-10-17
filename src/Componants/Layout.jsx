import React from 'react'
import Footer from './Footer';
import Navigation from './Navigation';
import { Outlet } from 'react-router';

export default function Layout() {
  return (
    <div>
      <Navigation/>
      <Outlet/>
      <Footer/>
    </div>
  )
}
