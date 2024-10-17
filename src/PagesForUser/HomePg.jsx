import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase';
import {doc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';

export default function HomePg() {

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
    <div>
      <h1>Thobeka bovana Njilo Jalamba</h1>

      <div className="flex flex-col space-y-4">
        {hotelList.map((hotel) => (
          <div key={hotel.id}>
            <h2>{hotel.hotel}</h2>
            <p>{hotel.location}</p>
            <p>{hotel.price}</p>
            <p>{hotel.faculties}</p>
            <p>{hotel.description}</p>
            <p>{hotel.details}</p>
            <button onClick={() => deleteHotel(hotel.id)}>Delete</button>
            <input placeholder='location'  onChange={(e) => setUpdates(e.target.value)}></input>
            <button onClick={() => updateHotel(hotel.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  )
}
