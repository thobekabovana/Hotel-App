import React, { useState } from "react";

export function AddHotelForm() {
  const [location, setLocation] = useState('');
  const [prices, setPrices] = useState('');
  const [description, setDescription] = useState('');
  const [faculties, setFaculties] = useState('');
  const [details, setDetails] = useState ('');


  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Handle form submission here
    console.log(
      "Form submitted with the following data:",
      firstName,
      lastName,
      email,
      guestCount,
      arrivalDate,
      arrivalTime,
      specialRequest
    );
  };

  return (
    <div className="container mx-auto flex flex-wrap justify-center items-center h-screen md:flex-cols-2 mt-8 w-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          <label for="imageUpload">Upload an Image:</label>
          <input type="file" id="imageUpload" name="imageUpload" accept="image/*"/>
       
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
        </form>
        </div>

)
}
