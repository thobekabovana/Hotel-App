import React, { useState } from "react";
function App() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  // Update state on window resize
  window.addEventListener("resize", () => {
    setIsSmallScreen(window.innerWidth < 768);
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Maning Hotels
          </h1>
          <p className="text-gray-600">the beauty of Sa</p>
        </div>
        <div className="mt-8">
          {/* Image section */}
          {isSmallScreen ? (
            <div className="rounded-lg overflow-hidden">
              <img
                src="https://source.unsplash.com/random/800x450"
                alt="Hotel Pool"
                className="w-full h-64 object-cover"
              />
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="w-1/2">
                {/* Login Form */}
                <div className="mt-8">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Username"
                  />
                  <input
                    type="password"
                    className="mt-4 w-full px-4 py-3 rounded-lg shadow-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Password"
                  />
                  <button
                    className="mt-4 w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue- " ></button>