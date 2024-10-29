import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import logo from '../assets/images/maning3 (1).svg';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize navigate
  const [showRoleModalSignIn, setShowRoleModalSignIn] = useState(false);
  const [showRoleModalSignUp, setShowRoleModalSignUp] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelectionSignIn = (role) => {
    setSelectedRole(role);
    setShowRoleModalSignIn(false);
    const path = role === 'LogIn' ? '/logIn' : '/log-in';
    navigate(path); 
  };

  const handleRoleSelectionSignUp = (role) => {
    setShowRoleModalSignUp(false);
    const path = role === 'Admin' ? '/register' : '/sign-up';
    navigate(path); // Navigate to the selected path
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

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex space-x-8">
              <li>
                <Link to="/landing" className="text-black hover:text-white">Home</Link>
              </li>
              <li>
                <button onClick={() => setShowRoleModalSignIn(true)} className="text-black hover:text-white">
                  Sign-In
                </button>
              </li>
              <li>
                <button onClick={() => setShowRoleModalSignUp(true)} className="text-black hover:text-white">
                  Sign-Up
                </button>
              </li>
            </ul>
          </div>

          {(location.pathname === '/home' || location.pathname === '/AddHotel') && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white bg-white">
                  {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Upload Image
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  const profilePath = location.pathname === '/AddHotel' ? '/profileAdmin' : '/profileUser';
                  console.log("Navigating to:", profilePath); // Debugging line
                  navigate(profilePath); // Use navigate for redirection
                }}
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
              onClick={() => handleRoleSelectionSignIn('Admin')}
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSelectionSignIn('Client')}
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
              onClick={() => handleRoleSelectionSignUp('Admin')}
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Admin
            </button>
            <button
              onClick={() => handleRoleSelectionSignUp('Client')}
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
