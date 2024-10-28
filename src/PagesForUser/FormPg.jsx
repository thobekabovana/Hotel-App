import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitBooking, resetStatus } from '../features/BookingSlice'

export function BookingForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.booking);

  useEffect(() => {
    if (success) {
      alert('Booking successful!');
      // Reset form fields
      setFullName('');
      setEmail('');
      setGuestCount('');
      setArrivalDate('');
      setDeparture('');
      setArrivalTime('');
      setSpecialRequest('');
      dispatch(resetStatus());
    }
  }, [success, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !guestCount || !arrivalDate || !arrivalTime || !departure) {
      alert('Please fill in all fields');
      return;
    }

    const bookingData = {
      fullName,
      email,
      guestCount: parseInt(guestCount, 10),
      arrivalDate,
      arrivalTime,
      departure,
      specialRequest,
    };

    dispatch(submitBooking(bookingData));
  };

  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen p-4">
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="guestCount"
        >
          Guest Count
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="guestCount"
          type="number"
          value={guestCount}
          onChange={(e) => setGuestCount(e.target.value)}
          min="1"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="arrivalDate"
        >
          Arrival Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="arrivalDate"
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="arrivalTime"
        >
          Arrival Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="arrivalTime"
          type="time"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="depature"
        >
          Departure Date
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="depature"
          type="date"
          value={departure }
          onChange={(e) => setDepature(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="specialRequest"
        >
          Special Request
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="specialRequest"
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
        />
      </div>

      <button
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
  );
}