import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import image from '../assets/images/240_F_46075517_EuzqL0cGOzzPcPL5YHYoNXdcRpi7EqzI.jpg';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, role } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser({ email, password }));
    if (loginUser.fulfilled.match(resultAction)) {
      const userRole = resultAction.payload.role;
      if (userRole === 'admin') {
        navigate('/admin-dashboard'); // Redirect admin to dashboard
      } else {
        navigate('/home'); // Redirect client to home
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen">
      <div className="md:w-1/2 p-4 md:p-8">
        <img src={image} alt="Hotel Image" className="w-full h-full object-cover" />
      </div>
      <div className="md:w-1/2 p-4 md:p-8 mr-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Log In</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2">
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
              <p>
                Don't have an account?{' '}
                <a href="/sign-up" style={{ textDecoration: 'none', color: 'blue' }}>
                  Click here
                </a>
              </p>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
