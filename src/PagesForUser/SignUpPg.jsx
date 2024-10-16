import React, { useState } from 'react';
import image from '../assets/images/240_F_46075517_EuzqL0cGOzzPcPL5YHYoNXdcRpi7EqzI.jpg'
import {auth} from '../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

import firebase from 'firebase/compat/app';

function SignUpPg() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password =="" || email =="" || name == "") {
      alert("Please fill in all fields");
    }

    if (!password.length >=6) {
      alert("Password must be at least 6 characters");
    }


    try {
      await createUserWithEmailAndPassword(auth, email, password).then(cred => {
         db.collection('users').doc(cred.user.uid).set({
          name: SignUpPg['signup-name'].value
        }).then(() => {
           
        });  
      })
      
      console.log("Account Created")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between h-screen bg-gray-100">
         <div className="md:w-1/2 p-4 md:p-8">
            <img src={image} alt="Hotel Image" className="w-full h-full object-cover" />
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
     
    </div>
  );
}

export default SignUpPg ;