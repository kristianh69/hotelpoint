"use client";

import React, { useEffect, useState } from "react";

interface Booking {
  id: string; // ID ako string
  name: string;
  startingDate: string;
  endingDate: string;
  price: number;
}

const MyBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/userbookings");
        if (response.ok) {
          const data = await response.json();
          console.log("kk", data);
          setBookings(data);
        } else {
          setError("Nezískali sme žiadne rezervácie.");
        }
      } catch (err) {
        setError("Došlo k chybe pri načítavaní rezervácií.");
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch("/api/deletebooking", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setBookings((prev) => prev.filter((booking) => booking.id !== id));
      } else {
        const data = await response.json();
        alert(data.message || "Nepodarilo sa odstrániť rezerváciu.");
      }
    } catch (error) {
      console.error("Chyba pri odstraňovaní rezervácie:", error);
      alert("Došlo k chybe pri odstraňovaní rezervácie.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : bookings.length > 0 ? (
        <ul className="space-y-6">
          {bookings.map((booking) => (
            <li
              key={booking.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-semibold">{booking.name}</h2>
              <p className="mt-2 text-gray-400">
                Dátum: {booking.startingDate} - {booking.endingDate}
              </p>
              <p className="mt-2 text-green-400 font-bold">
                Cena: {booking.price} €
              </p>
              <button
                onClick={() => handleDelete(booking.id)}
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
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

export default MyBooking;
