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
      alert("Došlo k chybe pri odstraňovaní rezervácie.");
    }
  };

  const handleConfirm = async (id: string) => {
    if (!confirm("Naozaj chcete potvrdiť rezerváciu?")) return;

    try {
      const response = await fetch(`/api/admin/bookings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setData((prevData) =>
          prevData.map((booking) =>
            booking.id === id ? { ...booking, Confirmed: true } : booking
          )
        );
        alert("Rezervácia bola úspešne potvrdená.");
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      alert("Došlo k chybe pri potvrdení rezervácie.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-center mt-16 px-4">
        <div className="w-full max-w-6xl bg-white p-6 shadow-lg rounded-lg">
          {loading ? (
            <p className="text-center text-gray-500">Načítavam rezervácie...</p>
          ) : error ? (
            <p className="text-center text-red-600">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Meno
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Od kedy
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Do kedy
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Meno
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Cena za noc
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((booking) => (
                    <tr key={booking.id} className="border-t">
                      <td className="px-4 py-2 text-sm">{booking.Room.name}</td>
                      <td className="px-4 py-2 text-sm">
                        {booking.User.email}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {booking.StartingDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {booking.EndingDate.split("T")[0]}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {booking.User.name} {booking.User.surname}
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {booking.Room.price}
                      </td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        {booking.Confirmed ? (
                          <p></p>
                        ) : (
                          <button
                            className="bg-green-500 text-white px-4 py-2 rounded w-full max-w-[120px] hover:bg-green-600 transition"
                            onClick={() => handleConfirm(booking.id)}
                          >
                            Potvrdiť
                          </button>
                        )}
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded w-full max-w-[120px] hover:bg-red-600 transition"
                          onClick={() => handleDelete(booking.id)}
                        >
                          Odstrániť
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
