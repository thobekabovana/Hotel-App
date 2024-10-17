// src/ProfilePage.js
import React, { useState } from "react";

const ProfilePage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
<nav className="flex flex-col justify-center items-center mt-[10%] bg-gray-100">
      <div className="relative">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-green-500 bg-white">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-full h-full object-cover"
            />
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
    </nav>

    <main>
      
    </main>
    </>
  );
};

export default ProfilePage;
