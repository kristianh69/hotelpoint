"use client";

import React, { useEffect, useState } from "react";
import { Booking } from "./../interfaces";

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

  const handleDelete = async (id: string) => {
    if (!confirm("Naozaj chcete zmazať rezerváciu?")) return;

    try {
      const response = await fetch(`/api/booking`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setData((prevData) => prevData.filter((record) => record.id !== id));
        alert("Rezervácia bola úspešne odstránená.");
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
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {" "}
        <div className="flex justify-center mt-32">
          <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
            {loading ? (
              <p className="text-center text-gray-500">
                Načítavam rezervácie...
              </p>
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
                    <th className="px-4 py-2 text-left">Meno</th>
                    <th className="px-4 py-2 text-left">Cena</th>
                    <th className="px-4 py-2 text-left">Akcie</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((booking) => (
                    <tr key={booking.id} className="text-center border-t">
                      <td className="px-4 py-2">{booking.Room.name}</td>
                      <td className="px-4 py-2">{booking.User.email}</td>
                      <td className="px-4 py-2">
                        {booking.StartingDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2">
                        {booking.EndingDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2">
                        {booking.User.name} {booking.User.surname}
                      </td>
                      <td className="px-4 py-2">{booking.Room.price}</td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => handleDelete(booking.id)}
                        >
                          Odstrániť
                        </button>
                        <button className="bg-green-500 text-white px-4 py-2 rounded">
                          Potvrdit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
