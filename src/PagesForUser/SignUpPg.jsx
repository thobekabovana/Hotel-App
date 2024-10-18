// src/components/SignUpPg.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../features/userSlice';
import image from '../assets/images/240_F_46075517_EuzqL0cGOzzPcPL5YHYoNXdcRpi7EqzI.jpg';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');
    if (!name || !email || !password) {
      return alert('Please fill in all fields');
    }
    if (password.length < 6) {
      return alert('Password must be at least 6 characters');
    }

    dispatch(signUpUser({ name, email, password }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between h-screen bg-gray-100">
      <div className="md:w-1/2 p-4 md:p-8">
        <img src={image} alt="Hotel" className="w-full h-full object-cover" />
      </div>
      <div className="md:w-1/2 p-8">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name and Surname</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Submit'}
          </button>
         
           <p>  Already have an account? 
            <a href="/log-in" style={{ textDecoration: 'none', color: 'blue' }}> Click here
           </a>
           </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
