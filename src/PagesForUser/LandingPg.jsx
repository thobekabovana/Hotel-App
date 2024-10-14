import React from 'react'
import image from '../assets/images/240_F_92422404_bMSSnE0ujiKXp9JVViw44IvJVkjDGoRh.jpg'


export default function LandingPg() {
  return (
    <>
              <div className="flex flex-col md:flex-row justify-center items-center h-screen">
              <div className="md:w-1/2 p-4 md:p-8">
    <img src={image} alt="Hotel Image" className="w-full h-full object-cover" />
  </div>
  <div className="md:w-1/2 p-4 md:p-8 mr-4">
    <h1 className="text-3xl font-bold mb-4">Welcome To <br/> Manning Hotels</h1>
    <p className="text-lg mb-4">Find yourself the best hotel ever. <br/> Stay comfortable, and get what you need</p>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">Admin</button>
    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Client</button>
  </div>
 
</div> 
    </>
  )
}
