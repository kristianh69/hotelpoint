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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/userbookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          setError("Nezískali sme žiadne rezervácie.");
        }
      } catch (err) {
        setError("Došlo k chybe pri načítavaní rezervácií.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      {loading ? (
        <p className="text-center text-gray-400">Načítavam rezervácie...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : bookings.length > 0 ? (
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
      ) : (
        <p className="text-center text-gray-400">
          Žiadne rezervácie nenájdené.
        </p>
      )}
    </div>
  );
};

export default MyBookings;
