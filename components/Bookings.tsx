"use client";

import React, { useEffect, useState } from "react";

interface Booking {
  id: number;
  name: string;
  email: string;
  startDate: string;
  endDate: string;
  guests: number;
  price: number;
}

export default function ReservationTable() {
  const [data, setData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/bookings");
        if (response.ok) {
          const bookings = await response.json();
          setData(bookings);
        } else {
          setError("Nepodarilo sa načítať rezervácie.");
        }
      } catch (err) {
        setError("Došlo k chybe pri načítavaní rezervácií.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((record) => record.id !== id));
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        {loading ? (
          <p className="text-center text-gray-500">Načítavam rezervácie...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Meno</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Od kedy</th>
                <th className="px-4 py-2 text-left">Do kedy</th>
                <th className="px-4 py-2 text-left">Počet hostí</th>
                <th className="px-4 py-2 text-left">Cena</th>
                <th className="px-4 py-2 text-left">Akcie</th>
              </tr>
            </thead>
            <tbody>
              {data.map((booking) => (
                <tr key={booking.id} className="text-center border-t">
                  <td className="px-4 py-2">{booking.name}</td>
                  <td className="px-4 py-2">{booking.email}</td>
                  <td className="px-4 py-2">{booking.startDate}</td>
                  <td className="px-4 py-2">{booking.endDate}</td>
                  <td className="px-4 py-2">{booking.guests}</td>
                  <td className="px-4 py-2">{booking.price}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Odstrániť
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
