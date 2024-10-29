// src/ProfilePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation control
import Hotels from "./HotelAdmin";
import Available from "./Available";
import Booked from "./Booked";
import { auth, db } from "../Firebase"; // Firebase auth and firestore imports
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const [profile, setProfile] = useState(null); // User's profile data
  const [image, setImage] = useState(null);
  const [updates, setUpdates] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("hotels");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // To redirect if needed

  // Fetch the logged-in user's profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          navigate("/login"); // Redirect to login if not authenticated
          return;
        }

        const profileDoc = doc(db, "Admin", user.uid); // Fetch profile by UID
        const profileSnapshot = await getDoc(profileDoc);

        if (profileSnapshot.exists()) {
          setProfile({ id: profileSnapshot.id, ...profileSnapshot.data() });
        } else {
          setError("Profile not found!");
          navigate("/login"); // Redirect if profile doesn't exist
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const deleteProfile = async () => {
    try {
      await deleteDoc(doc(db, "Admin", profile.id));
      alert("Profile deleted successfully!");
      auth.signOut(); // Log the user out after deleting their profile
      navigate("/login");
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  const updateProfile = async () => {
    try {
      await updateDoc(doc(db, "Admin", profile.id), updates);
      alert("Profile updated successfully!");
      setIsEditing(false); // Close the input after successful update
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleUpdateChange = (e) => {
    setUpdates({ ...updates, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

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
            onClick={deleteProfile}
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
              onClick={updateProfile}
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
                activeTab === "hotels"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-indigo-500 transition`}
              onClick={() => setActiveTab("hotels")}
            >
              Hotels
            </button>
            <button
              className={`px-6 py-2 rounded ${
                activeTab === "available"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-indigo-500 transition`}
              onClick={() => setActiveTab("available")}
            >
              Available
            </button>
            <button
              className={`px-6 py-2 rounded ${
                activeTab === "booked"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } hover:bg-indigo-500 transition`}
              onClick={() => setActiveTab("booked")}
            >
              Booked
            </button>
          </div>

          {/* Content Section */}
          <div className="p-6 border rounded shadow-md bg-white min-h-[200px]">
            {activeTab === "hotels" && <Hotels />}
            {activeTab === "available" && <Available />}
            {activeTab === "booked" && <Booked />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
