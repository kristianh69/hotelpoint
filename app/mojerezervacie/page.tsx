"use client";

import React, { useEffect, useState } from "react";

interface Booking {
  id: number;
  roomName: string;
  startingDate: string;
  endingDate: string;
  price: number;
}

const MyBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/userbookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      } catch {}
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      {bookings.length > 0 ? (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-semibold">
                {booking.roomName || "Názov izby"}
              </h2>
              <p className="mt-2 text-gray-400">
                Dátum: {booking.startingDate} - {booking.endingDate}
              </p>
              <p className="mt-2 text-green-400 font-bold">
                Cena: {booking.price} €
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                Odstrániť
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default MyBookings;
