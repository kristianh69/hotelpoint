"use client";

import React, { useEffect, useState } from "react";

interface Rezervacia {
  id: number;
  roomName: string;
  StartingDate: string;
  EndingDate: string;
  price: number;
}

const MojeRezervacie: React.FC = () => {
  const [rezervacie, setRezervacie] = useState<Rezervacia[]>([]);

  useEffect(() => {
    const fetchRezervacie = async () => {
      try {
        const response = await fetch("/api/bookings");
        if (response.ok) {
          const data = await response.json();
          setRezervacie(data);
        }
      } catch {}
    };

    fetchRezervacie();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-32">
      {rezervacie.length > 0 ? (
        <ul className="space-y-6">
          {rezervacie.map((rezervacia) => (
            <li
              key={rezervacia.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700"
            >
              <h2 className="text-2xl font-semibold">
                {rezervacia.roomName || "Názov izby"}
              </h2>
              <p className="mt-2 text-gray-400">
                Dátum: {rezervacia.StartingDate} - {rezervacia.EndingDate}
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
      ) : null}
    </div>
  );
};

export default MojeRezervacie;
