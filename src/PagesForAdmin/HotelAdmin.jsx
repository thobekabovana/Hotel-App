import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase';
import {doc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';

export default function Hotels() {

  const [hotelList, setHotelList] = useState([]);
  const [updates, setUpdates] = useState ('');
  
  const hotelsCollection = collection(db, "Hotels")

  useEffect(() => {
    const getHotelsList = async () => {
      try {
       const data = await getDocs(hotelsCollection)
       const filteredData = data.docs.map((doc) => ({
             ...doc.data(), 
             id: doc.id,
            }))
      //  console.log(filteredData)
      setHotelList(filteredData)
      } catch (err) {
        console.error(err)
      }
    };

    getHotelsList();

  }, []);

  const deleteHotel = async (id) => {
     const hotelDoc = doc(db, "Hotels", id)
    await deleteDoc(hotelDoc);
  };

  const updateHotel = async (id) => {
    const hotelDoc = doc(db, "Hotels", id)
   await updateDoc(hotelDoc, {location: updates});
 };
 

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Hotels That you Have
    </h1>
  
    <ul className="space-y-6">
      {hotelList.map((hotel) => (
        <li
          key={hotel.id}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">{hotel.hotel}</h2>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteHotel(hotel.id)}
            >
              Delete
            </button>
          </div>
  
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-bold">Location:</span> {hotel.location}
          </p>
  
          <p className="text-lg text-gray-700 mb-2">
            <span className="font-semibold">Price:</span> {hotel.price}
          </p>
  
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Facilities:</span> {hotel.faculties}
          </p>
  
          <p className="text-gray-500 mb-4">{hotel.description}</p>
  
          <p className="text-sm text-gray-500 mb-4">{hotel.details}</p>
  
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Update Location"
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={(e) => setUpdates(e.target.value)}
            />
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
              onClick={() => updateHotel(hotel.id)}
            >
              Update
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  )
}
