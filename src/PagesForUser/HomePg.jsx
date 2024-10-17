import React, { useEffect, useState } from 'react'
import { auth, db } from '../Firebase';
import { getDocs, collection } from 'firebase/firestore';

export default function HomePg() {

  const [hotelList, setHotelList] = useState([]);
  
  const hotelsCollection = collection(db, "Users")

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
 

  return (
    <div>
      <h1>Thobeka bovana Njilo Jalamba</h1>

      <div>
        {hotelList.map((hotel) => (
          <div key={hotel.id}>
            <h2>{hotel.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
