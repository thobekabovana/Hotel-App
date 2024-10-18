import React, { useState } from 'react';
import image from '../assets/images/240_F_46075517_EuzqL0cGOzzPcPL5YHYoNXdcRpi7EqzI.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../features/adminSlice'
import { useNavigate } from 'react-router-dom';

function Register() {



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/AddHotel');
    if (!name || !email || !password) {
      alert('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    dispatch(registerUser({ name, email, password, companyName, companyNumber }));
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
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name and Surname
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-bold mb-2">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="number" className="block text-gray-700 font-bold mb-2">
              Company Registration Number
            </label>
            <input
              type="text"
              id="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={companyNumber}
              onChange={(e) => setCompanyNumber(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button> 
          <p>  Already have an account? 
            <a href="/logIn" style={{ textDecoration: 'none', color: 'blue' }}> Click here
             </a>
           </p>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
