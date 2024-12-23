"use client";

import React from "react";

const MojeRezervacie = () => {
  const rezervacie = [
    {
      id: 1,
      roomName: "Izba s výhľadom na more",
      startDate: "2024-12-25",
      endDate: "2024-12-28",
      price: 120,
    },
    {
      id: 2,
      roomName: "Izba s výhľadom na hory",
      startDate: "2025-01-10",
      endDate: "2025-01-15",
      price: 100,
    },
    {
      id: 3,
      roomName: "izba ",
      startDate: "2025-02-01",
      endDate: "2025-02-05",
      price: 250,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      {rezervacie.length > 0 ? (
        <ul className="space-y-6">
          {rezervacie.map((rezervacia) => (
            <li
              key={rezervacia.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-semibold">{rezervacia.roomName}</h2>
              <p className="mt-2 text-gray-400">
                Dátum: {rezervacia.startDate} - {rezervacia.endDate}
              </p>
              <p className="mt-2 text-green-400 font-bold">
                Cena: {rezervacia.price} €
              </p>
              <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                Odstrániť
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">Nemáte žiadne rezervácie.</p>
      )}
    </div>
  );
};

export default MojeRezervacie;
