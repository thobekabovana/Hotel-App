import React, { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { 
  doc, getDocs, collection, deleteDoc, updateDoc, setDoc, getDoc 
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'; // Heart icons

export default function Hotels() {
  const [hotelList, setHotelList] = useState([]);
  const [favorites, setFavorites] = useState({});
  const hotelsCollection = collection(db, 'Hotels');
  const navigate = useNavigate();
  const user = auth.currentUser; // Get current user

  useEffect(() => {
    const getHotelsList = async () => {
      try {
        const data = await getDocs(hotelsCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setHotelList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchFavorites = async () => {
      if (!user) return;
      const favDoc = await getDoc(doc(db, 'userFavorites', user.uid));
      if (favDoc.exists()) {
        setFavorites(favDoc.data().favorites || {});
      }
    };

    getHotelsList();
    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (hotelId) => {
    if (!user) {
      alert('Please log in to favorite hotels.');
      return;
    }

    const newFavorites = { ...favorites, [hotelId]: !favorites[hotelId] };

    // Update Firestore with new favorites
    await setDoc(doc(db, 'userFavorites', user.uid), { favorites: newFavorites });

    setFavorites(newFavorites); // Update local state
  };

  const handleBooking = () => {
    navigate('/booking');
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Hotels That You Have
      </h1>

      <ul className="space-y-6">
        {hotelList.map((hotel) => (
          <li 
            key={hotel.id} 
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300"
          >
            <div className="flex flex-col items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-900">{hotel.hotel}</h2>
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

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
                onClick={handleBooking}
              >
                Book
              </button>

              {/* Heart Icon for Favorites */}
              <button 
                onClick={() => toggleFavorite(hotel.id)} 
                className="mt-4 text-2xl"
              >
                {favorites[hotel.id] ? (
                  <AiFillHeart className="text-red-500" />
                ) : (
                  <AiOutlineHeart className="text-gray-400" />
                )}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
