// src/ProfilePage.js
import React, { useState } from "react";
import { auth, db } from "../Firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Favourites from "./Favourites";
import BookingHistory from "./BookingHistory";

const ProfileUser = ({ profile }) => {
  const [image, setImage] = useState(null);
  const [updates, setUpdates] = useState({});
  const [isEditing, setIsEditing] = useState(false); 
  const [activeTab, setActiveTab] = useState('hotels');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const deleteProfile = async (id) => {
    try {
      const profileDoc = doc(db, "Admin", id);
      await deleteDoc(profileDoc);
      alert("Profile deleted successfully!");
    } catch (error) {
      console.error("Error deleting profile: ", error);
    }
  };

  const updateProfile = async (id) => {
    try {
      const profileDoc = doc(db, "Admin", id);
      await updateDoc(profileDoc, updates);
      alert("Profile updated successfully!");
      setIsEditing(false); // Close the input after successful update
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleUpdateChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  return (
    <>
      <nav className="flex flex-col justify-center items-center bg-gray-100 mt-5">
        {/* Profile Image */}
        <div className="relative mb-4">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-500 bg-white">
            {image ? (
              <img src={image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Upload Image
              </div>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={handleImageChange}
            className="hidden"
          />

          <label
            htmlFor="imageUpload"
            className="absolute bottom-0 right-0 bg-green-500 text-white px-3 py-1 rounded-full cursor-pointer shadow-md transition-transform transform hover:scale-105"
          >
            Change
          </label>
        </div>

        {/* Update and Delete Buttons */}
        <div className="flex gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
            onClick={() => deleteProfile(profile.id)}
          >
            Delete
          </button>

          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Update"}
          </button>
        </div>

        {/* Update Input (Shown on Click) */}
        {isEditing && (
          <div className="mt-4">
            <input
              type="text"
              name="name"
              placeholder="Update Name"
              onChange={handleUpdateChange}
              className="p-2 border rounded w-full mb-2"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => updateProfile(profile.id)}
            >
              Save Changes
            </button>
          </div>
        )}
      </nav>

      <main>
      <div className="container mx-auto p-6">
      {/* Tabs Section */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'hotels'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-indigo-500 transition`}
          onClick={() => setActiveTab('hotels')}
        >
          Hotels
        </button>
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'available'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-indigo-500 transition`}
          onClick={() => setActiveTab('available')}
        >
          Available
        </button>
        <button
          className={`px-6 py-2 rounded ${
            activeTab === 'booked'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-200 text-gray-800'
          } hover:bg-indigo-500 transition`}
          onClick={() => setActiveTab('booked')}
        >
          Booked
        </button>
      </div>

      {/* Content Section */}
      <main className="p-6 border rounded shadow-md bg-white min-h-[200px]">
        {activeTab === 'hotels' && <Favourites />}
        {activeTab === 'available' && <BookingHistory />}
        {activeTab === 'booked' && <Booked />}
      </main>
    </div>
      </main>
    </>
  );
};

export default ProfileUser;
