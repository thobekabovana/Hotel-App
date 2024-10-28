import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { doc, getDocs, collection, deleteDoc, updateDoc } from 'firebase/firestore';
import { storage } from '../Firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export default function Hotels() {
  const [hotelList, setHotelList] = useState([]);
  const [updates, setUpdates] = useState({ location: '', price: '', facilities: '', description: '', details: '' });
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const [imageUrls, setImageUrls] = useState({}); // Object to hold image URLs for each hotel

  const hotelsCollection = collection(db, "Hotels");

  useEffect(() => {
    const getHotelsList = async () => {
      try {
        const data = await getDocs(hotelsCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setHotelList(filteredData);
        // Fetch images for each hotel
        filteredData.forEach(hotel => {
          fetchImage(hotel.id, hotel.imagePath); // Assuming imagePath is a property in hotel data
        });
      } catch (err) {
        console.error(err);
      }
    };

    getHotelsList();
  }, []);

  const fetchImage = async (id, ) => {
    try {
      const imageRef = ref(storage, `Hotelfiles`); // Ensure imagePath is correct
      const url = await getDownloadURL(imageRef);
      console.log(`Fetched image URL for hotel ${id}:`, url);
      setImageUrls(prev => ({ ...prev, [id]: url }));
    } catch (error) {
      console.error(`Error fetching image for hotel ${id}:`, error);
    }
  };

  const deleteHotel = async (id) => {
    const hotelDoc = doc(db, "Hotels", id);
    await deleteDoc(hotelDoc);
  };

  const updateHotel = async (id) => {
    const hotelDoc = doc(db, "Hotels", id);
    await updateDoc(hotelDoc, updates);
    setShowUpdateForm(prev => ({ ...prev, [id]: false })); // Hide form after update
    setUpdates({ location: '', price: '', facilities: '', description: '', details: '' }); // Reset updates
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Hotels That you Have</h1>

      <ul className="space-y-6">
        {hotelList.map((hotel) => (
          <li key={hotel.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{hotel.hotel}</h2>
              
              {imageUrls[hotel.id] ? (
                <img src={imageUrls[hotel.id]} alt="Fetched from Firebase" />
              ) : (
                <p>Loading image...</p>
              )}
              
              <p className="text-sm text-gray-600 mb-2 text-center">
                <span className="font-bold">Location:</span> {hotel.location}
              </p>
              <p className="text-lg text-gray-700 mb-2 text-center">
                <span className="font-semibold">Price:</span> {hotel.price}
              </p>
              <p className="text-gray-600 mb-2 text-center">
                <span className="font-semibold">Facilities:</span> {hotel.faculties}
              </p>
              <p className="text-gray-500 mb-4 text-center">{hotel.description}</p>
              <p className="text-sm text-gray-500 mb-4 text-center">{hotel.details}</p>
            </div>

            {/* Centering buttons */}
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
                onClick={() => deleteHotel(hotel.id)}
              >
                Delete
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                onClick={() => setShowUpdateForm(prev => ({ ...prev, [hotel.id]: !prev[hotel.id] }))}
              >
                {showUpdateForm[hotel.id] ? 'Cancel' : 'Update'}
              </button>
            </div>

            {showUpdateForm[hotel.id] && (
              <div className="flex flex-col space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="Update Location"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={updates.location}
                  onChange={(e) => setUpdates({ ...updates, location: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Update Price"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={updates.price}
                  onChange={(e) => setUpdates({ ...updates, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Update Facilities"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={updates.facilities}
                  onChange={(e) => setUpdates({ ...updates, facilities: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Update Description"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={updates.description}
                  onChange={(e) => setUpdates({ ...updates, description: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Update Details"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={updates.details}
                  onChange={(e) => setUpdates({ ...updates, details: e.target.value })}
                />
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                  onClick={() => updateHotel(hotel.id)}
                >
                  Save Changes
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
