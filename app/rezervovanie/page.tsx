"use client";

import React, { useState, useEffect } from "react";

// Typ pre záznam o izbe
interface Room {
  id: number;
  name: string;
  description: string;
  numberOfBeds: number;
  price: number;
  imageUrl: string;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  return (
    <div className="p-6 bg-black min-h-screen">
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="flex flex-col justify-between bg-gray-900 border border-gray-700 rounded-lg shadow-lg hover:shadow-2xl hover:border-gray-500 transition-shadow duration-300"
          >
            <div>
              <div className="overflow-hidden rounded-t-lg h-48">
                <img
                  src={room.imageUrl}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 text-white">
                <h2 className="text-2xl font-semibold">{room.name}</h2>
                <p className="text-gray-400 mt-2">{room.description}</p>
                <p className="text-gray-400 mt-2">
                  Počet postelí: {room.numberOfBeds}
                </p>
                <p className="text-green-400 font-bold mt-4 text-lg">
                  Cena: {room.price} € / noc
                </p>
              </div>
            </div>
            <div className="p-6">
              <button className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-400 transition-colors duration-200">
                Rezervovať
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
