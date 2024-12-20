// LogInPg.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import image from '../assets/images/240_F_46075517_EuzqL0cGOzzPcPL5YHYoNXdcRpi7EqzI.jpg';

function LogInPg() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  // Redirect to the recipes page if the user is logged in
  useEffect(() => {
    if (user) {
      navigate('/AddHotel'); // Ensure you have a route for /recipes
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="md:w-1/2 p-4 md:p-8">
        <img src={image} alt="Hotel" className="w-full h-full object-cover" />
      </div>
      <div className="md:w-1/2 p-4 md:p-8 mr-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p className="mt-2">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500">
              Click here
            </a>
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default LogInPg;
