"use client";

import React, { useState, useEffect } from "react";

// Typ pre záznam o izbe
interface Room {
  id: number;
  name: string;
  description: string;
  numberOfBeds: number;
  price: number;
}

export default function RoomList() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await fetch("../../pages/api/rooms.ts");
      const data = await response.json();
      setRooms(data);
    };

    fetchRooms();
  }, []);

  // Zobrazenie zoznamu izieb
  return (
    <div className="p-4">
      <ul className="space-y-4">
        {rooms.map((room) => (
          <li key={room.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p>{room.description}</p>
            <p>Počet postelí: {room.numberOfBeds}</p>
            <p>Cena: {room.price} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
