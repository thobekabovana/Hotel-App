import React from 'react';
import logo from '../assets/images/maning3 (1).svg'
 

const Navigation = () => {
  return (
<nav className="bg-blue-800 p-4 ">
  <div className="flex items-center justify-between">
    {/* Logo Section */}
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-20 h-20" />
    </div>

    {/* Centered Navigation Links */}
    <div className="absolute left-1/2 transform -translate-x-1/2">
      <ul className="flex space-x-8">
        <li>
          <a href="/" className="text-black hover:text-blue-800">
            Home
          </a>
        </li>
        <li>
          <a href="/log-in" className="text-black hover:text-blue-800">
            Sign-In
          </a>
        </li>
        <li>
          <a href="/sign-up" className="text-black hover:text-blue-800">
            Sign-Up
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>

  
  );
};

export default Navigation;
