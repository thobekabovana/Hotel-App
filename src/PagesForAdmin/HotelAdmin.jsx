import React, { useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export default function Hotels() {
  const [hotelList, setHotelList] = useState([]);
  const [updates, setUpdates] = useState({ location: '', price: '', facilities: '', description: '', details: '' });
  const [showUpdateForm, setShowUpdateForm] = useState({});
  const [imageUrls, setImageUrls] = useState({}); // Store image URLs

  useEffect(() => {
    const getHotelsList = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.error('User not authenticated');
          return;
        }

        const hotelsQuery = query(
          collection(db, 'Hotels'),
          where('userId', '==', user.uid) // Only fetch hotels added by this user
        );

        const data = await getDocs(hotelsQuery);
        const hotels = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setHotelList(hotels);

        // Fetch images for each hotel
        hotels.forEach((hotel) => {
          if (hotel.imagePath) fetchImage(hotel.id, hotel.imagePath);
        });
      } catch (err) {
        console.error('Error fetching hotels:', err);
      }
    };

    getHotelsList();
  }, []);

  const fetchImage = async (hotelId, imagePath) => {
    try {
      const imageRef = ref(storage, imagePath); // Use correct path from the hotel data
      const url = await getDownloadURL(imageRef);
      setImageUrls((prev) => ({ ...prev, [hotelId]: url }));
    } catch (error) {
      console.error(`Error fetching image for hotel ${hotelId}:`, error);
    }
  };

  const deleteHotel = async (id) => {
    try {
      await deleteDoc(doc(db, 'Hotels', id));
      setHotelList((prev) => prev.filter((hotel) => hotel.id !== id)); // Remove deleted hotel from state
    } catch (err) {
      console.error('Error deleting hotel:', err);
    }
  };

  const updateHotel = async (id) => {
    try {
      const hotelDoc = doc(db, 'Hotels', id);
      await updateDoc(hotelDoc, updates);
      setShowUpdateForm((prev) => ({ ...prev, [id]: false })); // Hide form after update
      setUpdates({ location: '', price: '', facilities: '', description: '', details: '' }); // Reset updates
    } catch (err) {
      console.error('Error updating hotel:', err);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Hotels You Have Added</h1>

      <ul className="space-y-6">
        {hotelList.map((hotel) => (
          <li key={hotel.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300">
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{hotel.hotel}</h2>

              {imageUrls[hotel.id] ? (
                <img src={imageUrls[hotel.id]} alt="Hotel" className="w-64 h-48 object-cover mb-4" />
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

            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
                onClick={() => deleteHotel(hotel.id)}
              >
                Delete
              </button>
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                onClick={() => setShowUpdateForm((prev) => ({ ...prev, [hotel.id]: !prev[hotel.id] }))}
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
