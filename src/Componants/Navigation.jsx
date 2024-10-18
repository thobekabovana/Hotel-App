import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // For detecting the current path
import logo from '../assets/images/maning3 (1).svg';

const Navigation = () => {
  const location = useLocation(); // Get the current URL path
  const profileImageUrl = "path/to/your/profile-image.jpg"; // Not used
  const [showRoleModalSignIn, setShowRoleModalSignIn] = useState(false);
  const [showRoleModalSignUp, setShowRoleModalSignUp] = useState(false);
  const [image, setImage] = useState(null);

  const handleRoleSelectionSignIn = (role) => {
    setShowRoleModalSignIn(false);
    const path = role === 'LogIn' ? '/logIn' : '/log-in';
    window.location.href = path;
  };
  const handleRoleSelectionSignUp = (role) => {
    setShowRoleModalSignUp(false);
    const path = role === 'Admin' ? '/register' : '/sign-up'; // Match the role values
    window.location.href = path;
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <nav className="bg-blue-800 p-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="w-20 h-20" />
          </div>

          {location.pathname === '/profileAdmin' ? (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex space-x-8">
                <li>
                  <button
                    onClick={() => (window.location.href = "/AddHotel")}
                    className="text-black hover:text-white"
                  >
                    Home
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <ul className="flex space-x-8">
                <li>
                  <button
                    onClick={() => (window.location.href = "/home")}
                    className="text-black hover:text-white"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowRoleModalSignIn(true)}
                    className="text-black hover:text-white"
                  >
                    Sign-In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowRoleModalSignUp(true)}
                    className="text-black hover:text-white"
                  >
                    Sign-Up
                  </button>
                </li>
              </ul>
            </div>
          )}

          

          {/* Profile Image & Click Button (Only show on home page) */}
          {location.pathname === '/home' && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white">
                  {image ? (
                    <img
                      src={image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Upload Image
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => (window.location.href = "/profileAdmin")}
                className="bg-blue-500 text-white px-3 py-1 rounded-full cursor-pointer shadow-md transition-transform transform hover:scale-105"
              >
                Click
              </button>
            </div>
          )}
        </div>
      </nav>



      {/* Role Selection Modal */}
      {showRoleModalSignIn && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="mb-4">Select Your Role</h2>
            <button
              onClick={() => handleRoleSelectionSignIn('LogIn')}
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSelectionSignIn('log-in')}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Client
            </button>
            <button
              onClick={() => setShowRoleModalSignIn(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

{showRoleModalSignUp && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="mb-4">Select Your Role</h2>
      <button
        onClick={() => handleRoleSelectionSignUp('Admin')} // Pass 'Admin'
        className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Admin
      </button>
      <button
        onClick={() => handleRoleSelectionSignUp('Client')} // Pass 'Client'
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Client
      </button>
      <button
        onClick={() => setShowRoleModalSignUp(false)}
        className="mt-4 text-gray-600 hover:text-gray-800"
      >
        Cancel
      </button>
    </div>
  </div>
)}
      
    </>
  );
};

export default Navigation;
