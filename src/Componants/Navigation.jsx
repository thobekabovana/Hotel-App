import React from 'react';
import logo from '../assets/images/maning3 (1).svg'
 

const Navigation = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-between items-center">
      <div>
        <img src={logo} alt="Logo" className="w-20 h-20"/>
      </div>
       

        <div className="justify-center">
        <li className="mr-auto">
          <a href="/" className="text-black flex items-center">Home</a>
        </li>
          <li><a href="/sign-in" className="text-white">Sign-In</a></li>
          <li><a href="/sign-up" className="text-white">Sign-Up</a></li>
        </div>
      </ul>
    </nav>
  );
};

export default Navigation;
