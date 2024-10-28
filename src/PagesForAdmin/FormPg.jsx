import React, { useState } from "react";
import { auth, db, storage } from '../Firebase';
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";

export function AddHotelForm() {
  const [location, setLocation] = useState('');
  const [prices, setPrices] = useState('');
  const [description, setDescription] = useState('');
  const [faculties, setFaculties] = useState('');
  const [details, setDetails] = useState('');
  const [hotel, setHotel] = useState('');
  const [fileUpload, setFileUpload] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty fields
    if (!location || !prices || !description || !faculties || !details) {
      alert("Please fill in all fields");
      return; // Stop execution if validation fails
    }

    try {
      // Add a new document with an auto-generated ID
      const docRef = await addDoc(collection(db, "Hotels"), {
        hotel: hotel,
        location: location,
        prices: prices,
        description: description,
        faculties: faculties,
        details: details,
        userId: auth?.currentUser?.uid,
      });

      // Call uploadFile after successfully adding the hotel
      await uploadFile(docRef.id);

    } catch (err) {
      console.error("Error adding hotel:", err.message);
    }
  };

  const uploadFile = async (hotelId) => {
    if (!fileUpload) {
      alert("Please select a file to upload.");
      return;
    }
  
    const fileFolderRef = ref(storage, `Hotelfiles/${hotelId}/${fileUpload.name}`);
    try {
      // Upload the file to the specified reference
      await uploadBytes(fileFolderRef, fileUpload);
      alert("File uploaded successfully");
    } catch (err) {
      console.error("Error uploading file:", err.message);
      alert("Error uploading file: " + err.message); // Notify the user about the error
    }
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center items-center h-screen md:flex-cols-2 mt-8 w-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hotel">
            Name of the Hotel
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="hotel"
            type="text"
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="prices">
            Prices
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="prices"
            type="text"
            value={prices}
            onChange={(e) => setPrices(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="faculties">
            Faculties
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="faculties"
            type="text"
            value={faculties}
            onChange={(e) => setFaculties(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">
            Details
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="details"
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <input
            type="file"
            onChange={(e) => setFileUpload(e.target.files[0])} // Change this to 0 to access the first file
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
